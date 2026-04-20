import React, { useRef, useState } from "react";
import ParticipantLobby from "./lobby/ParticipantLobby";
import HostLobby from "./lobby/HostLobby";
import RoomLeaderboard from "./roomLeaderboard/RoomLeaderboard";
import QuestionDisplay from "./questionDisplay/QuestionDisplay";
import QuizResultView from "./QuizResultView";
import { io } from "socket.io-client";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useLocation } from "react-router";

export default function QuizRoom() {
  const token = Cookies.get("token");
  const [role, setRole] = useState("user");
  const [status, setStatus] = useState("waiting");
  const [users, setUsers] = useState([]);
  const location = useLocation();
  const roomCode = location.state;
  const socketRef = useRef(null);
  const questions = useRef(null);
  const [userScore, setUserScore] = useState([]);
  const startTime = useRef(0);
  const [timeUp, setTimeUp] = useState(false);
  const [leaderboard, setLeaderBoard] = useState([]);
  const [quizDuration, setQuizDuration] = useState(30);
  const [quizResult, setQuizResult] = useState(null);
  const [resultLoading, setResultLoading] = useState(false);

  const handleMsg = (msg) => {
    console.log(msg);
  };

  const handleScoresOfUsers = (data) => {
    console.log(data, "leaderboard of users ");
    setLeaderBoard(data.score);
  };

  const handleTimeUp = () => {
    setTimeUp(true);
    setResultLoading(role === "user");
  };

  const handleStartTime = (data) => {
    startTime.current = data.startTime;
    console.log(startTime.current);
  };

  const handleRole = (msg) => {
    console.log(msg, "role");
    setRole(msg);
  };

  const handleRoomConfig = (data) => {
    setQuizDuration(data.quizDuration || 30);
  };

  const handleQuizStart = (msg) => {
    console.log(msg);
    setStatus(msg.status);
    questions.current = msg.questions;
    setQuizDuration(msg.quizDuration || 30);
  };

  const handleUserJoin = (data) => {
    setUsers((prev) => {
      if (prev.includes(data.userName)) return prev;
      return [...prev, data.userName];
    });
  };

  const handleScoreUpdate = (data) => {
    console.log(data);

    setUserScore((previousScore) => {
      const exists = previousScore.find((u) => u.id === data.id);

      if (exists) {
        return previousScore.map((p) => {
          return p.id === data.id ? { ...p, score: data.scoreOfUser } : p;
        });
      }

      return [
        ...previousScore,
        { userName: data.userName, score: data.scoreOfUser, id: data.id },
      ];
    });
  };

  const handleQuizResult = (data) => {
    setLeaderBoard(data.leaderboard || []);
    setQuizResult(data);
    setResultLoading(false);
    setTimeUp(true);
  };

  useEffect(() => {
    const socket = io(import.meta.env.VITE_WS_URL, {
      auth: {
        token: token,
        roomCode,
      },
    });

    socketRef.current = socket;

    socket.on("message", handleMsg);
    socket.on("role", handleRole);
    socket.on("roomConfig", handleRoomConfig);
    socket.on("status", handleQuizStart);
    socket.on("newUserJoined", handleUserJoin);
    socket.on("updateScore", handleScoreUpdate);
    socket.on("startTime", handleStartTime);
    socket.on("time-up", handleTimeUp);
    socket.on("leaderboard", handleScoresOfUsers);
    socket.on("quizResult", handleQuizResult);

    return () => {
      socket.off("message", handleMsg);
      socket.off("role", handleRole);
      socket.off("roomConfig", handleRoomConfig);
      socket.off("status", handleQuizStart);
      socket.off("newUserJoined", handleUserJoin);
      socket.off("updateScore", handleScoreUpdate);
      socket.off("startTime", handleStartTime);
      socket.off("time-up", handleTimeUp);
      socket.off("leaderboard", handleScoresOfUsers);
      socket.off("quizResult", handleQuizResult);
      socket.disconnect();
    };
  }, []);

  function startQuiz() {
    socketRef.current.emit("startQuiz");
  }

  const renderContent = () => {
    if (role === "admin" && status === "waiting") {
      return (
        <HostLobby
          startQuiz={startQuiz}
          players={users}
          roomCode={roomCode}
          quizDuration={quizDuration}
        />
      );
    } else if (role === "user" && status === "waiting") {
      return (
        <ParticipantLobby roomCode={roomCode} quizDuration={quizDuration} />
      );
    } else if (status === "in-progress" && role === "user" && !timeUp) {
      return (
        <QuestionDisplay
          duration={quizDuration}
          questions={questions.current}
          socket={socketRef.current}
          startTime={startTime.current}
        />
      );
    } else if (status === "in-progress" && role === "admin") {
      return <RoomLeaderboard players={userScore} />;
    } else if (timeUp) {
      if (role === "user") {
        return (
          <QuizResultView
            leaderboard={leaderboard}
            loading={resultLoading}
            recentScores={quizResult?.recentScores || []}
            review={quizResult?.review || null}
          />
        );
      }

      return <RoomLeaderboard players={leaderboard} />;
    }
  };

  return (
    <div>
      <div className="h-screen w-full">{renderContent()}</div>
    </div>
  );
}
