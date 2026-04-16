import "./App.css";
import { Button } from "@/components/ui/button";

import { Link } from "react-router";

function App() {
  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-indigo-600 to-purple-600 text-white overflow-hidden">
        {/* Decorative Circles */}
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-indigo-400 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-purple-400 rounded-full opacity-30 animate-pulse"></div>

        <div className="max-w-6xl mx-auto px-6 py-32 flex flex-col-reverse md:flex-row items-center gap-12 md:gap-24">
          {/* Text Content */}
          <div className="md:w-1/2 z-10">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
              Engage Your Audience in Real-Time
            </h1>
            <p className="text-lg md:text-xl mb-8">
              Create fun multiplayer quizzes, polls, and interactive
              presentations that everyone can join instantly.
            </p>
            <div className="flex gap-4">
              <Link to="/signup">
                <button className="bg-white text-indigo-600 font-semibold px-8 py-4 rounded-xl hover:bg-gray-100 transition cursor-pointer">
                  Get Started
                </button>
              </Link>
              <button className="border border-white px-8 py-4 rounded-xl hover:bg-white hover:text-indigo-600 transition">
                Learn More
              </button>
            </div>
          </div>

          {/* Image */}
          <div className="md:w-1/2 flex justify-center z-10">
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-64 h-64 bg-white/20 rounded-xl blur-3xl"></div>
              <img
                src="/quiz2.png"
                alt="Real-time Quiz"
                className="rounded-xl shadow-2xl w-full max-w-md relative z-10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <h2 className="text-4xl font-bold text-center mb-16">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 text-center">
            <h3 className="text-2xl font-semibold mb-4">
              Real-Time Interaction
            </h3>
            <p>
              See answers as participants respond live, creating a dynamic and
              engaging experience.
            </p>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 text-center">
            <h3 className="text-2xl font-semibold mb-4">Multiplayer Quizzes</h3>
            <p>
              Challenge friends or colleagues with multiplayer quizzes and see
              scores instantly.
            </p>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 text-center">
            <h3 className="text-2xl font-semibold mb-4">Easy to Use</h3>
            <p>
              Create quizzes, polls, and interactive sessions in just a few
              clicks.
            </p>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="bg-indigo-600 text-white py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Your Quiz?</h2>
          <p className="mb-8 text-lg">
            Join thousands of users creating fun interactive sessions daily.
          </p>
          <Link to="/login">
            <button className="bg-white text-indigo-600 font-semibold px-8 py-4 rounded-xl hover:bg-gray-100 transition cursor-pointer">
              Create Your Quiz
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default App;
