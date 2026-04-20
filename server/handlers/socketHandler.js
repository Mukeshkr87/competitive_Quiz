import jwt from "jsonwebtoken";
import { getRedisClient } from "./redisHandler.js";
import { Score } from "../models/scoreModel.js";

const activeRoomSessions = new Map();

const getSessionKey = (roomCode, userId) => `room:${roomCode}:score:${userId}`;

const normaliseQuestion = (question) => {
  const correctOption = question.options[question.ansIndex - 1];

  return {
    id: String(question._id),
    title: question.title,
    options: question.options,
    correctOption,
  };
};

const createRoomSession = (roomCode, roomDetails) => {
  const questions = roomDetails.quiz.questions.map(normaliseQuestion);
  const questionMap = new Map(questions.map((question) => [question.id, question]));

  const session = {
    roomCode,
    quizId: String(roomDetails.quiz._id),
    quizTitle: roomDetails.quiz.title,
    totalQuestions: questions.length,
    questionMap,
    participants: new Map(),
    timer: null,
  };

  activeRoomSessions.set(roomCode, session);

  return session;
};

const getOrCreateRoomSession = (roomCode, roomDetails) => {
  const existingSession = activeRoomSessions.get(roomCode);

  if (existingSession) {
    return existingSession;
  }

  return createRoomSession(roomCode, roomDetails);
};

const resetSessionForStart = (session) => {
  if (session.timer) {
    clearTimeout(session.timer);
  }

  session.timer = null;

  for (const participant of session.participants.values()) {
    participant.score = 0;
    participant.answers = new Map();
  }
};

const registerParticipant = (session, userId, userName) => {
  if (!session.participants.has(userId)) {
    session.participants.set(userId, {
      userId,
      userName,
      score: 0,
      answers: new Map(),
    });
  }

  return session.participants.get(userId);
};

const buildQuestionReviews = (session, participant) => {
  return Array.from(session.questionMap.values()).map((question) => {
    const answer = participant.answers.get(question.id);

    return {
      questionId: question.id,
      title: question.title,
      options: question.options,
      selectedOption: answer?.selectedOption ?? null,
      correctOption: question.correctOption,
      isCorrect: answer?.isCorrect ?? false,
      scoreAwarded: answer?.scoreAwarded ?? 0,
      timeRemaining: answer?.timeRemaining ?? 0,
    };
  });
};

const buildLeaderboard = (session) => {
  return Array.from(session.participants.values())
    .map((participant) => ({
      id: participant.userId,
      userName: participant.userName,
      score: participant.score,
    }))
    .sort((a, b) => b.score - a.score);
};

const persistSessionScores = async (session) => {
  const scorePayload = Array.from(session.participants.values()).map(
    (participant) => {
      const questionReviews = buildQuestionReviews(session, participant);
      const correctAnswers = questionReviews.filter(
        (question) => question.isCorrect
      ).length;

      return {
        userId: participant.userId,
        quizId: session.quizId,
        roomCode: session.roomCode,
        quizTitle: session.quizTitle,
        score: participant.score,
        username: participant.userName,
        totalQuestions: session.totalQuestions,
        correctAnswers,
        questionReviews,
      };
    }
  );

  if (scorePayload.length > 0) {
    await Score.insertMany(scorePayload);
  }
};

const cleanupSessionCache = async (roomCode, participantIds) => {
  const client = getRedisClient();

  if (!client) {
    return;
  }

  try {
    for (const userId of participantIds) {
      await client.del(getSessionKey(roomCode, userId));
    }
  } catch (redisError) {
    console.error("Redis error cleaning up scores:", redisError.message);
  }
};

const finalizeQuiz = async (wss, roomCode) => {
  const session = activeRoomSessions.get(roomCode);

  if (!session) {
    return;
  }

  const leaderboard = buildLeaderboard(session);
  const participantIds = Array.from(session.participants.keys());

  try {
    await persistSessionScores(session);
  } catch (error) {
    console.error("Error persisting quiz results:", error.message);
  }

  for (const participant of session.participants.values()) {
    const questionReviews = buildQuestionReviews(session, participant);
    const correctAnswers = questionReviews.filter(
      (question) => question.isCorrect
    ).length;
    const recentScores = await Score.find({ userId: participant.userId })
      .sort({ createdAt: -1 })
      .limit(10)
      .lean();

    wss.to(participant.userId).emit("quizResult", {
      leaderboard,
      review: {
        userName: participant.userName,
        score: participant.score,
        totalQuestions: session.totalQuestions,
        correctAnswers,
        quizTitle: session.quizTitle,
        questionReviews,
      },
      recentScores,
    });
  }

  wss.to(roomCode).emit("leaderboard", { score: leaderboard });
  await cleanupSessionCache(roomCode, participantIds);
  activeRoomSessions.delete(roomCode);
};

export const handleSocket = (wss) => {
  wss.on("connection", async (socket) => {
    try {
      const token = socket.handshake.auth.token;
      const roomCode = socket.handshake.auth.roomCode;

      if (!token || !roomCode) {
        return new Error("Authentication Error");
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const userId = decoded.user.id;
      const userName = decoded.user.name;

      const client = getRedisClient();
      if (!client) {
        console.error("Redis client not available in socket handler");
        socket.emit("error", "Room data not available");
        return;
      }

      let roomDetails;
      try {
        roomDetails = await client.get(roomCode);
      } catch (redisError) {
        console.error("Redis error getting room details:", redisError.message);
        socket.emit("error", "Room data not available");
        return;
      }

      if (!roomDetails) {
        socket.emit("error", "Room not found");
        return;
      }

      const parsedRoomDetails = JSON.parse(roomDetails);

      const questions = parsedRoomDetails.quiz.questions.map((question) => {
        return {
          id: String(question._id),
          title: question.title,
          options: question.options,
        };
      });

      const roomCreatorId =
        parsedRoomDetails.createdBy?._id ?? parsedRoomDetails.createdBy;
      const isAdmin = String(userId) === String(roomCreatorId);

      socket.join(roomCode);
      socket.join(userId);

      socket.emit("role", isAdmin ? "admin" : "user");
      socket.emit("roomConfig", {
        quizDuration: Number(parsedRoomDetails.quizDuration) || 30,
      });

      if (!isAdmin) {
        const session = getOrCreateRoomSession(roomCode, parsedRoomDetails);
        registerParticipant(session, userId, userName);
        socket.to(roomCode).emit("newUserJoined", { userId, userName });
      }

      socket.on("startQuiz", () => {
        if (!isAdmin) {
          socket.emit("error", "You aren't authorized");
          return;
        }

        const startDelay = 2000;
        const durationInSeconds = Number(parsedRoomDetails.quizDuration) || 30;
        const durationInMs = durationInSeconds * 1000;
        const startTime = Date.now() + startDelay;
        const session = getOrCreateRoomSession(roomCode, parsedRoomDetails);
        resetSessionForStart(session);

        wss.to(roomCode).emit("startTime", { startTime });
        wss.to(roomCode).emit("status", {
          status: "in-progress",
          questions,
          quizDuration: durationInSeconds,
        });

        const duration = startDelay + durationInMs + 300;
        session.timer = setTimeout(async () => {
          wss.to(roomCode).emit("time-up");
          await finalizeQuiz(wss, roomCode);
        }, duration);
      });

      socket.on("answer", async (data) => {
        try {
          if (isAdmin) {
            return;
          }

          const session = activeRoomSessions.get(roomCode);

          if (!session) {
            socket.emit("error", "Quiz is not active");
            return;
          }

          const participant = registerParticipant(session, userId, userName);
          const questionId = String(data.id);
          const question = session.questionMap.get(questionId);

          if (!question) {
            socket.emit("error", "Question not found");
            return;
          }

          if (participant.answers.has(questionId)) {
            return;
          }

          const isCorrect = question.correctOption === data.option;
          const scoreAwarded = isCorrect ? 10 + Number(data.duration || 0) : 0;

          participant.answers.set(questionId, {
            selectedOption: data.option,
            isCorrect,
            scoreAwarded,
            timeRemaining: Number(data.duration || 0),
          });
          participant.score += scoreAwarded;

          if (isCorrect) {
            socket.to(roomCode).emit("updateScore", {
              userName,
              scoreOfUser: participant.score,
              id: userId,
            });
          }

          await client.setEx(
            getSessionKey(roomCode, userId),
            600,
            String(participant.score)
          );
        } catch (redisError) {
          console.error("Redis error in answer handling:", redisError.message);
        }
      });
    } catch (error) {
      console.log(error);
      socket.emit("error", "Authentication Failed");
      socket.disconnect();
      console.log("socket disconnected");
    }
  });
};
