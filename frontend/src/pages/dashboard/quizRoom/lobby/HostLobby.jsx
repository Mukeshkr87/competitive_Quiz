import React from "react";
import { Button } from "@/components/ui/button";

const HostLobby = ({ startQuiz, players, roomCode, quizDuration = 30 }) => {
  console.log(players, "players");
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-950 via-sky-950 to-cyan-900 p-4">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/90 p-6 text-center shadow-lg backdrop-blur-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Host Lobby</h1>

        <p className="text-gray-500">Share this code with players:</p>
        <div className="text-4xl font-bold text-blue-600 tracking-widest mt-2 mb-4">
          {roomCode}
        </div>
        <p className="text-sm text-gray-500">Quiz time: {quizDuration} seconds</p>

        <div className="border-t border-gray-200 pt-4">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">
            Players Joined
          </h2>
          <div className="flex flex-wrap justify-center gap-2">
            {players.length > 0 &&
              players.map((player, i) => (
                <div
                  key={i}
                  className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium shadow-sm"
                >
                  {player}
                </div>
              ))}
          </div>
        </div>

        <Button
          className="mt-8 w-full rounded-xl bg-slate-950 text-white transition active:scale-95 hover:bg-slate-800"
          onClick={startQuiz}
        >
          Start Game
        </Button>
      </div>
    </div>
  );
};

export default HostLobby;
