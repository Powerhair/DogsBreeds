import React, { useState, useEffect } from "react";

import "./Quiz.scss";

export default function Quiz({ breeds }) {
  const [currentBreedIndex, setCurrentBreedIndex] = useState(null);
  const [dogInfo, setDogInfo] = useState({
    image: "",
    options: [],
    correctAnswer: null,
  });
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(false);

  console.log(dogInfo.options);

  useEffect(() => {
    if (breeds.length > 0) {
      setCurrentBreedIndex(getRandomBreedIndex());
    }
  }, [breeds]);

  useEffect(() => {
    if (currentBreedIndex !== null) {
      const breed = breeds[currentBreedIndex]?.nameEn;

      const fetchCurrentDog = () => {
        return fetch(`https://dogsbreed.store/dogbreeds/${breed}`)
          .then((response) => response.json())
          .then((info) => {
            setDogInfo((prevDogInfo) => ({
              ...prevDogInfo,
              image: info.imagePath,
            }));
          })
          .catch((err) => {
            console.error(err);
          });
      };

      fetchCurrentDog();
    }
  }, [currentBreedIndex, breeds]);

  useEffect(() => {
    if (currentBreedIndex !== null && breeds.length > 0) {
      const randomIndices = generateRandomIndices(breeds.length, 4);
      const options = randomIndices.map((index) => breeds[index]?.nameRu);
      const correctAnswer = breeds[currentBreedIndex]?.nameRu;

      setDogInfo((prevDogInfo) => ({
        ...prevDogInfo,
        options: shuffleArray([...options, correctAnswer]),
        correctAnswer: correctAnswer,
      }));
    }
  }, [currentBreedIndex, breeds]);

  // Генерация случайного индекса породы
  const getRandomBreedIndex = () => {
    return Math.floor(Math.random() * breeds.length);
  };

  const generateRandomIndices = (max, count) => {
    const indices = [];
    while (indices.length < count) {
      const randomIndex = Math.floor(Math.random() * max);
      if (!indices.includes(randomIndex)) {
        indices.push(randomIndex);
      }
    }
    return indices;
  };

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const handleAnswerClick = (index) => {
    const selectedAnswer = dogInfo.options[index];
    if (selectedAnswer === dogInfo.correctAnswer) {
      setIsCorrectAnswer(true);
      setSelectedAnswerIndex(index);

      setTimeout(() => {
        setSelectedAnswerIndex(null);
        setIsCorrectAnswer(false);
        setCurrentBreedIndex(getRandomBreedIndex());
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
