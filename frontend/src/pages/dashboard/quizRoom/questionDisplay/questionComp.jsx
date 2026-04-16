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
            <span className="text-lg font-semibold text-gray-800">
              {remainingTime}s
            </span>
          )}
        </CountdownCircleTimer>
      </div>

      {/* Question */}
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        {currQuestion.title || "Loading question..."}
      </h2>

      {/* Options */}
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
                    ? "bg-indigo-600 text-white border-indigo-600 shadow-md"
                    : "bg-white/90 hover:bg-indigo-50 border-gray-200"
                }`}
          >
            {opt}
          </motion.button>
        ))}
      </div>

      {/* Submit */}

      <div className="mt-8">
        <Button
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-xl"
          disabled={!enabled}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}
