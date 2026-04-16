const RoomLeaderboard = ({ players }) => {
  // Sort players by score (highest first)

  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6">
      <h1 className="text-2xl font-bold mb-6">🏆 Leaderboard</h1>

      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-md divide-y divide-gray-700">
        {sortedPlayers.map((player, index) => (
          <div
            key={player?.id || index}
            className="flex items-center justify-between px-4 py-3"
          >
            <span className="font-semibold flex items-center gap-3">
              <span className="text-gray-400 w-6 text-center">
                {index + 1}.
              </span>
              {player?.userName}
            </span>
            <span className="font-bold text-yellow-400">{player?.score}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomLeaderboard;
