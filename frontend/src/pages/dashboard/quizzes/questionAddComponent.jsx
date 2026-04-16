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
    <div className="bg-white rounded-xl shadow p-4 space-y-4">
      <h2 className="text-lg font-semibold">{heading}</h2>
      <div
        className="max-h-[350px] md:max-h-[350px] overflow-y-auto space-y-3 
                            scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100"
      >
        {[...list].map((q, i) => (
          <div
            key={i}
            className="p-3 border rounded-lg flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3"
          >
            <p className="text-sm md:text-base flex-1">
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
