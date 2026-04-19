import { Button } from "@/components/ui/button";

const QuestionAddComponent = ({
  list,
  className,
  task,
  purpose,
  heading,
  variant,
}) => {
  return (
    <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
        {heading}
      </h2>
      <div
        className="max-h-[350px] md:max-h-[350px] overflow-y-auto space-y-3 
                            scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100"
      >
        {[...list].map((q, i) => (
          <div
            key={q.id || q._id || `${q.title}-${i}`}
            className="flex flex-col gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3 sm:flex-row sm:items-center sm:justify-between dark:border-slate-700 dark:bg-slate-950/60"
          >
            <p className="flex-1 text-sm text-slate-900 dark:text-slate-100 md:text-base">
              Question {i + 1}: {q.title}
            </p>
            <Button
              type="button"
              size="sm"
              className={className}
              onClick={() => task(q)}
              variant={variant || "outline"}
            >
              {purpose}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionAddComponent;
