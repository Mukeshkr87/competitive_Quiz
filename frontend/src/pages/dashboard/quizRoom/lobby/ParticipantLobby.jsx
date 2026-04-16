const ParticipantLobby = ({ roomCode }) => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-indigo-800 via-purple-700 to-pink-600 text-white p-6">
      {/* Top: Logo / Title */}
      <div className="absolute top-10 text-center">
        <h1 className="text-2xl font-bold tracking-tight">🎯 Join the Game</h1>
        <p className="text-sm opacity-80">Powered by Quizify</p>
      </div>

      {/* Card Container */}
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-3xl shadow-lg p-8 text-center border border-white/20">
        {/* Room Code Section */}
        <h2 className="text-xl font-medium opacity-80">Room Code</h2>
        <p className="text-6xl font-extrabold text-yellow-300 drop-shadow-sm tracking-[0.3em] my-3">
          {roomCode}
        </p>

        {/* Fun Waiting Animation */}
        <div className="flex justify-center items-center mt-2 mb-6 space-x-1">
          <span className="w-3 h-3 bg-yellow-300 rounded-full animate-bounce"></span>
          <span className="w-3 h-3 bg-yellow-300 rounded-full animate-bounce delay-150"></span>
          <span className="w-3 h-3 bg-yellow-300 rounded-full animate-bounce delay-300"></span>
        </div>
        <p className="text-yellow-100 font-medium mb-4 text-lg">
          Waiting for host to start...
        </p>

        {/* Players Cloud */}
        {/* <div className="relative w-full flex flex-wrap justify-center gap-3 pt-4 pb-2 border-t border-white/20 max-h-[40vh] overflow-y-auto">
          {players.map((name, i) => (
            <div
              key={i}
              className={`px-4 py-2 rounded-full text-sm font-semibold bg-white/20 hover:bg-white/30 transition-transform transform hover:scale-105 ${
                i % 2 === 0 ? "text-yellow-200" : "text-pink-200"
              }`}
            >
              {name}
            </div>
          ))}
        </div> */}

        {/* Footer small info */}
        <p className="text-xs text-white/60 mt-6">
          Get ready... the quiz will start soon!
        </p>
      </div>

      {/* Floating Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute w-56 h-56 bg-pink-400/30 rounded-full blur-3xl top-10 left-10 animate-pulse"></div>
        <div className="absolute w-72 h-72 bg-indigo-400/30 rounded-full blur-3xl bottom-10 right-10 animate-pulse delay-700"></div>
      </div>
    </div>
  );
};

export default ParticipantLobby;
