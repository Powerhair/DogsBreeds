import React, { useState } from "react";

import "./Quiz.scss";

export default function Quiz({ dogInfo, nextQuizQuestion }) {
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(false);

  const handleAnswerClick = (index) => {
    const selectedAnswer = dogInfo.options[index];
    if (selectedAnswer === dogInfo.correctAnswer) {
      setIsCorrectAnswer(true);
      setSelectedAnswerIndex(index);

      setTimeout(() => {
        setSelectedAnswerIndex(null);
        setIsCorrectAnswer(false);
        nextQuizQuestion();
      }, 2000); // Ждем 2 секунды перед переключением на следующий вопрос
    } else {
      setIsCorrectAnswer(false);
      setSelectedAnswerIndex(index);
    }
  };

  const renderAnswers = () => {
    return dogInfo.options.map((option, index) => (
      <button
        key={index}
        className="quiz__button"
        onClick={() => handleAnswerClick(index)}
      >
        {option}
      </button>
    ));
  };

  return (
    <div className="quiz">
      <h3 className="quiz__title">Собачий квиз</h3>
      {/* <div className="quiz__card"> */}
      <img className="quiz__img" src={dogInfo.image} alt="" />
      {/* </div> */}
      <div className="quiz__container">{renderAnswers()}</div>

      {selectedAnswerIndex !== null && (
        <div className="quiz__result">
          {isCorrectAnswer ? (
            <span className="quiz__result--correct">Правильно!</span>
          ) : (
            <span className="quiz__result--incorrect">Неправильно!</span>
          )}
        </div>
      )}
    </div>
  );
}
