import { Trash2 } from "lucide-react";

function DisplayQuiz({ quizzes, deleteQuiz }) {
  return (
    <div>
      {quizzes.length === 0 ? (
        <p className="text-gray-600">No quizzes available.</p>
      ) : (
        <ul className="space-y-3">
          {quizzes.map((q) => (
            <li
              key={q._id}
              className="flex justify-between items-center p-4 bg-white rounded-lg shadow border"
            >
              <span>{q.title}</span>
              <button
                onClick={() => deleteQuiz(q._id)}
                className="text-red-500 hover:text-red-700 cursor-pointer"
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
