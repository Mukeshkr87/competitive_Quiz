import React, { useRef, useState } from "react";
import ParticipantLobby from "./lobby/ParticipantLobby";
import HostLobby from "./lobby/HostLobby";
import RoomLeaderboard from "./roomLeaderboard/RoomLeaderboard";
import QuestionDisplay from "./questionDisplay/QuestionDisplay";
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
  const playerScore = useRef(null);
  const [leaderboard, setLeaderBoard] = useState([]);

  const handleMsg = (msg) => {
    console.log(msg);
  };

  const handleScoresOfUsers = (data) => {
    console.log(data, "leaderboard of users ");
    setLeaderBoard(data.score);
  };

  const handleTimeUp = () => {
    // playerScore.current = userScore;
    setTimeUp(true);
    socketRef.current.emit("leaderboard", { score: playerScore.current });
  };

  const handleStartTime = (data) => {
    startTime.current = data.startTime;
    console.log(startTime.current);
  };

  const handleRole = (msg) => {
    console.log(msg, "role");
    setRole(msg);
  };

  const handleQuizStart = (msg) => {
    console.log(msg);
    setStatus(msg.status);
    questions.current = msg.questions;
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
    socket.on("status", handleQuizStart);
    socket.on("newUserJoined", handleUserJoin);
    socket.on("updateScore", handleScoreUpdate);
    socket.on("startTime", handleStartTime);
    socket.on("time-up", handleTimeUp);
    socket.on("leaderboard", handleScoresOfUsers);

    return () => {
      socket.off("message", handleMsg);
      socket.off("role", handleRole);
      socket.off("status", handleQuizStart);
      socket.off("newUserJoined", handleUserJoin);
      socket.off("updateScore", handleScoreUpdate);
      socket.off("startTime", handleStartTime);
      socket.off("time-up", handleTimeUp);
      socket.on("leaderboard", handleScoresOfUsers);
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    playerScore.current = userScore;
  }, [userScore]);

  function startQuiz() {
    socketRef.current.emit("startQuiz");
  }

  const renderContent = () => {
    if (role === "admin" && status === "waiting") {
      return (
        <HostLobby startQuiz={startQuiz} players={users} roomCode={roomCode} />
      );
    } else if (role === "user" && status === "waiting") {
      return <ParticipantLobby roomCode={roomCode} />;
    } else if (status === "in-progress" && role === "user" && !timeUp) {
      return (
        <QuestionDisplay
          questions={questions.current}
          socket={socketRef.current}
          startTime={startTime.current}
        />
      );
    } else if (status === "in-progress" && role === "admin") {
      return <RoomLeaderboard players={userScore} />;
    } else if (timeUp) {
      return <RoomLeaderboard players={leaderboard} />;
    }
  };

  return (
    <div>
      <div className="h-screen w-full">{renderContent()}</div>
    </div>
  );
}
