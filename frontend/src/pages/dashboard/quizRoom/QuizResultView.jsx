import RecentAttemptsPanel from "@/components/custom/RecentAttemptsPanel";

export default function QuizResultView({
  review,
  leaderboard,
  recentScores,
  loading,
}) {
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 text-white">
        Finalising your quiz results...
      </div>
    );
  }

  if (!review) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 text-white">
        Result review is not available for this attempt.
      </div>
    );
  }

  const percentage = review.totalQuestions
    ? Math.round((review.correctAnswers / review.totalQuestions) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.18),transparent_32%),linear-gradient(180deg,#020617,#0f172a)] px-4 py-8 text-white md:px-8">
      <div className="mx-auto grid max-w-7xl gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur">
          <p className="text-sm uppercase tracking-[0.24em] text-sky-300">
            Quiz completed
          </p>
          <h1 className="mt-3 text-3xl font-black">{review.quizTitle}</h1>
          <p className="mt-2 text-slate-300">
            {review.userName}, here is your detailed review for this attempt.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-slate-950/40 p-5">
              <p className="text-sm text-slate-400">Total score</p>
              <p className="mt-2 text-4xl font-black text-emerald-300">
                {review.score}
              </p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-slate-950/40 p-5">
              <p className="text-sm text-slate-400">Correct answers</p>
              <p className="mt-2 text-4xl font-black text-sky-300">
                {review.correctAnswers}/{review.totalQuestions}
              </p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-slate-950/40 p-5">
              <p className="text-sm text-slate-400">Accuracy</p>
              <p className="mt-2 text-4xl font-black text-amber-300">
                {percentage}%
              </p>
            </div>
          </div>

          <div className="mt-8 rounded-[1.75rem] border border-white/10 bg-slate-950/40 p-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.22em] text-slate-400">
                  Live standings
                </p>
                <h2 className="mt-1 text-2xl font-bold">Leaderboard</h2>
              </div>
            </div>

            <div className="mt-5 space-y-3">
              {leaderboard.map((player, index) => (
                <div
                  key={player.id || index}
                  className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
                >
                  <span className="font-medium text-slate-200">
                    {index + 1}. {player.userName}
                  </span>
                  <span className="font-bold text-amber-300">
                    {player.score}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur">
            <p className="text-sm uppercase tracking-[0.22em] text-slate-400">
              Question review
            </p>
            <h2 className="mt-1 text-2xl font-bold">Check every answer</h2>

            <div className="mt-6 space-y-4">
              {review.questionReviews.map((question, index) => (
                <article
                  key={question.questionId || index}
                  className={`rounded-3xl border p-5 ${
                    question.isCorrect
                      ? "border-emerald-400/30 bg-emerald-400/10"
                      : "border-rose-400/30 bg-rose-400/10"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-300">
                        Question {index + 1}
                      </p>
                      <h3 className="mt-2 text-lg font-semibold">
                        {question.title}
                      </h3>
                    </div>
                    <div
                      className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${
                        question.isCorrect
                          ? "bg-emerald-300/20 text-emerald-200"
                          : "bg-rose-300/20 text-rose-200"
                      }`}
                    >
                      {question.isCorrect ? "Correct" : "Incorrect"}
                    </div>
                  </div>

                  <div className="mt-4 space-y-2 text-sm text-slate-200">
                    <p>
                      Your answer: {question.selectedOption || "Not answered"}
                    </p>
                    <p>Correct answer: {question.correctOption}</p>
                    <p>Score earned: {question.scoreAwarded}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <RecentAttemptsPanel
            attempts={recentScores}
            title="Last 10 quiz scores"
            emptyMessage="Your attempts will start appearing here once results are saved."
          />
        </section>
      </div>
    </div>
  );
}
