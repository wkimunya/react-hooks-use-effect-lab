import React, { useEffect, useState } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  // add useEffect code
  useEffect(() => {
    let timer;

    const handleTimeout = () => {
      setTimeRemaining((prevTime) => {
        if (prevTime === 1) {
          onAnswered(false);
          return 10;
        }
        return prevTime - 1;
      });
      timer = setTimeout(handleTimeout, 1000);
    };

    // Start the initial timeout
    timer = setTimeout(handleTimeout, 1000);

    // Clear the timeout and reset the timer when the component unmounts
    return () => {
      clearTimeout(timer);
      setTimeRemaining(10);
    };
  }, [onAnswered]);


  function handleAnswer(isCorrect) {
    setTimeRemaining(10);
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
