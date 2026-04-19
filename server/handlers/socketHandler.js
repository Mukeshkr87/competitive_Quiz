import jwt from "jsonwebtoken";
import { getRedisClient } from "./redisHandler.js";
import { Score } from "../models/scoreModel.js";

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
          id: question._id,
          title: question.title,
          options: question.options,
        };
      });

      const questionsWithAnswers = parsedRoomDetails.quiz.questions;

      const roomCreatorId =
        parsedRoomDetails.createdBy?._id ?? parsedRoomDetails.createdBy;
      const isAdmin = String(userId) === String(roomCreatorId);

      socket.join(roomCode);

      socket.emit("role", isAdmin ? "admin" : "user");
      socket.emit("roomConfig", {
        quizDuration: Number(parsedRoomDetails.quizDuration) || 30,
      });

      if (!isAdmin) {
        socket.to(roomCode).emit("newUserJoined", { userId, userName });
      }

      socket.on("startQuiz", () => {
        if (!isAdmin) {
          socket.emit("error", "You aren't authorized");

          return;
        } else {
          // questions ek saath bhej do ...
          const startDelay = 2000;
          const durationInSeconds =
            Number(parsedRoomDetails.quizDuration) || 30;
          const durationInMs = durationInSeconds * 1000;
          const startTime = Date.now() + startDelay;
          wss.to(roomCode).emit("startTime", { startTime });

          wss.to(roomCode).emit("status", {
            status: "in-progress",
            questions: questions,
            quizDuration: durationInSeconds,
          });

          const duration = startDelay + durationInMs + 300;
          setTimeout(() => {
            wss.to(roomCode).emit("time-up");
            // user after recieving time-up , can see get their scores
          }, duration);
        }
      });

      socket.on("answer", async (data) => {
        try {
          let scoreOfUser = await client.get(userId);
          scoreOfUser = scoreOfUser ? parseInt(scoreOfUser) : 0;

          const question = questionsWithAnswers.find((q) => q._id === data.id);

          const correctAns =
            question.options[question.ansIndex - 1] === data.option;

          if (correctAns) {
            scoreOfUser = scoreOfUser + 10 + data.duration;
            socket.to(roomCode).emit("updateScore", {
              userName,
              scoreOfUser,
              id: userId,
            });
            await client.setEx(userId, 600, String(scoreOfUser));
          } else {
            console.log("false");
          }
        } catch (redisError) {
          console.error("Redis error in answer handling:", redisError.message);
        }
      });

      socket.on("leaderboard", async (data) => {
        if (isAdmin) {
          console.log(data.score);
          wss.to(roomCode).emit("leaderboard", { score: data.score });

          const userScore = data.score;
          try {
            for (const user of userScore) {
              await client.del(user.id);
            }
          } catch (redisError) {
            console.error("Redis error cleaning up scores:", redisError.message);
          }

          socket.disconnect();
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
