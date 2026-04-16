import React, { useEffect, useRef, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { Button } from "@/components/ui/button";
import QuestionComp from "./questionComp";

const QuestionDisplay = ({ duration = 30, questions, socket, startTime }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const key = useRef(0);
  const questionCount = useRef(0);
  const currTime = useRef(30);
  const [currQuestion, setCurrQuestion] = useState(
    questions[questionCount.current]
  );

  const [startTimer, setStartTimer] = useState(false);

  const currAnswer = useRef(null);
  const [enabled, setEnabled] = useState(true);
  const handleSubmit = () => {
    setCurrQuestion(questions[++questionCount.current]);
  };

  const handleClickSubmitButton = (opt) => {
    // const payload = {};

    currAnswer.current = {
      title: currQuestion.title,
      option: opt,
      id: currQuestion.id,
      duration: currTime.current,
    };

    if (currAnswer.current) {
      socket.emit("answer", currAnswer.current);
    }
  };

  const delay = startTime - Date.now();

  const handleStartTime = () => {
    setTimeout(() => {
      setStartTimer(true);
    }, delay);
  };

  useEffect(() => {
    handleStartTime();
  }, [delay]);

  const handleComponentRender = () => {
    if (startTimer && currQuestion) {
      return (
        <QuestionComp
          key={key}
          currQuestion={currQuestion}
          currTime={currTime}
          duration={duration}
          enabled={enabled}
          handleClickSubmitButton={handleClickSubmitButton}
          handleSubmit={handleSubmit}
          selectedOption={selectedOption}
          setEnabled={setEnabled}
          setSelectedOption={setSelectedOption}
        />
      );
    } else if (!startTimer) {
      return <div>Starting ...</div>;
    } else if (!currQuestion) {
      return <>All questions done , waiting for results ...</>;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 px-4">
      <div className="bg-white/80 backdrop-blur-md shadow-xl rounded-2xl p-8 w-full max-w-lg text-center">
        {/* Timer Circle */}

        {handleComponentRender()}
      </div>
    </div>
  );
};

export default QuestionDisplay;
