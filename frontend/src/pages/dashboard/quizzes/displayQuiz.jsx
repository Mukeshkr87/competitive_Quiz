import { Trash2 } from "lucide-react";

function DisplayQuiz({ quizzes, deleteQuiz }) {
  return (
    <div>
      {quizzes.length === 0 ? (
        <p className="text-slate-600 dark:text-slate-400">
          No quizzes available.
        </p>
      ) : (
        <ul className="space-y-3">
          {quizzes.map((q) => (
            <li
              key={q._id}
              className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-4 shadow-sm dark:border-slate-700 dark:bg-slate-950/60"
            >
              <span className="pr-4 font-medium text-slate-900 dark:text-slate-100">
                {q.title}
              </span>
              <button
                onClick={() => deleteQuiz(q._id)}
                className="cursor-pointer text-red-500 transition hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
              >
                <Trash2 size={18} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DisplayQuiz;
