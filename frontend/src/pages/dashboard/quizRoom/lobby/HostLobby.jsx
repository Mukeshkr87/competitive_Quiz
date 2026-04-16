import React from "react";
import { Button } from "@/components/ui/button";

const HostLobby = ({ startQuiz, players, roomCode }) => {
  console.log(players, "players");
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-800 via-purple-700 to-pink-600 p-4">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-md rounded-2xl shadow-lg p-6 text-center">
        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Host Lobby</h1>

        {/* Room Code */}
        <p className="text-gray-500">Share this code with players:</p>
        <div className="text-4xl font-bold text-blue-600 tracking-widest mt-2 mb-4">
          {roomCode}
        </div>

        {/* Players List */}
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

        {/* Start Button */}
        <Button
          className="mt-8 w-full bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition active:scale-95"
          onClick={startQuiz}
        >
          Start Game
        </Button>
      </div>
    </div>
  );
};

export default HostLobby;
