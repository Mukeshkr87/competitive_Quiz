const formatDate = (date) =>
  new Date(date).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

export default function RecentAttemptsPanel({
  attempts,
  title = "Recent attempts",
  emptyMessage = "No recent quiz attempts found yet.",
}) {
  return (
    <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
            Performance history
          </p>
          <h3 className="mt-1 text-2xl font-black text-slate-900 dark:text-slate-100">
            {title}
          </h3>
        </div>
        <div className="rounded-full bg-sky-100 px-4 py-2 text-sm font-semibold text-sky-700 dark:bg-sky-500/10 dark:text-sky-300">
          Last {Math.min(attempts.length, 10)} attempts
        </div>
      </div>

      {attempts.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-dashed border-slate-300 px-4 py-8 text-center text-slate-600 dark:border-slate-700 dark:text-slate-400">
          {emptyMessage}
        </div>
      ) : (
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {attempts.map((attempt) => (
            <article
              key={attempt._id}
              className="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-950/60"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
                    {formatDate(attempt.createdAt)}
                  </p>
                  <h4 className="mt-2 text-lg font-bold text-slate-900 dark:text-slate-100">
                    {attempt.quizTitle}
                  </h4>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                    Room code: {attempt.roomCode}
                  </p>
                </div>
                <div className="rounded-2xl bg-emerald-100 px-4 py-3 text-center dark:bg-emerald-500/10">
                  <p className="text-xs uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300">
                    Score
                  </p>
                  <p className="mt-1 text-2xl font-black text-emerald-700 dark:text-emerald-300">
                    {attempt.score}
                  </p>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-3 text-sm text-slate-700 dark:text-slate-300">
                <span className="rounded-full bg-white px-3 py-1 dark:bg-slate-900">
                  Correct: {attempt.correctAnswers}/{attempt.totalQuestions}
                </span>
                <span className="rounded-full bg-white px-3 py-1 dark:bg-slate-900">
                  Wrong: {attempt.totalQuestions - attempt.correctAnswers}
                </span>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
