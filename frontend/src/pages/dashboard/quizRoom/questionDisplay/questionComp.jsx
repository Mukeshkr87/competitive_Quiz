// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { Button } from "@/components/ui/button";

export default function QuestionComp({
  duration,
  currTime,
  setEnabled,
  currQuestion,
  setSelectedOption,
  handleClickSubmitButton,
  selectedOption,
  enabled,
  handleSubmit,
}) {
  return (
    <div>
      <div className="flex justify-center mb-6">
        <CountdownCircleTimer
          key={0}
          isPlaying={true}
          duration={duration}
          colors={["#4f46e5", "#facc15", "#f97316", "#ef4444"]}
          colorsTime={[10, 6, 3, 0]}
          size={80}
          strokeWidth={8}
          onUpdate={(remainingTime) => {
            return (currTime.current = remainingTime);
          }}
          onComplete={() => (setEnabled(false), { shouldRepeat: false })}
        >
          {({ remainingTime }) => (
            <span className="text-lg font-semibold text-slate-800">
              {remainingTime}s
            </span>
          )}
        </CountdownCircleTimer>
      </div>

      <h2 className="mb-6 text-xl font-semibold text-slate-800">
        {currQuestion.title || "Loading question..."}
      </h2>

      <div className="space-y-3">
        {currQuestion.options?.map((opt, idx) => (
          <motion.button
            key={idx}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              setSelectedOption(opt);
              handleClickSubmitButton(opt);
            }}
            disabled={!enabled}
            className={`w-full text-left px-4 py-3 rounded-xl border transition-all
                ${
                  selectedOption === opt
                    ? "border-indigo-600 bg-indigo-600 text-white shadow-md"
                    : "border-slate-200 bg-white text-slate-800 shadow-sm hover:bg-indigo-50 hover:text-slate-900"
                }`}
          >
            {opt}
          </motion.button>
        ))}
      </div>

      <div className="mt-8">
        <Button
          className="rounded-xl bg-indigo-600 px-6 py-2 text-white hover:bg-indigo-700"
          disabled={!enabled}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}
