//react
import React, { useState, useEffect } from "react";

//scss
import "./App.scss";

//Components
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { apiUrl } from "../../utils/config";

const App = () => {
  const [activeComponent, setActiveComponent] = useState("test");

  const [breedsList, setBreedsList] = useState([]);

  const [randomDogBreed, setRandomDogBreed] = useState([]);

  const [currentBreedIndex, setCurrentBreedIndex] = useState(null);
  const [dogInfo, setDogInfo] = useState({
    image: "",
    options: [],
    correctAnswer: null,
  });

  useEffect(() => {
    const fetchData = () => {
      return fetch(apiUrl + "dogbreeds")
        .then((response) => response.json())
        .then((data) => {
          setBreedsList(data);
        })
        .catch((err) => {
          console.error(err);
        });
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = () => {
      return fetch(apiUrl + "dogbreeds/random")
        .then((response) => response.json())
        .then((data) => {
          setRandomDogBreed(data);
        })
        .catch((err) => {
          console.error(err);
        });
    };

    fetchData(); // Выполняем запрос сразу, при первом рендере

    const interval = setInterval(fetchData, 60000); // Запускаем запрос каждую минуту (60000 мс)

    return () => {
      clearInterval(interval); // Очищаем интервал при размонтировании компонента
    };
  }, []);

  useEffect(() => {
    if (breedsList.length > 0) {
      setCurrentBreedIndex(getRandomBreedIndex());
    }
  }, [breedsList]);

  useEffect(() => {
    if (currentBreedIndex !== null) {
      const breed = breedsList[currentBreedIndex]?.nameEn;

      const fetchCurrentDog = () => {
        return fetch(apiUrl + `dogbreeds/${breed}`)
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
  }, [currentBreedIndex, breedsList]);

  useEffect(() => {
    if (currentBreedIndex !== null && breedsList.length > 0) {
      const randomIndices = generateRandomIndices(breedsList.length, 4);
      const options = randomIndices.map((index) => breedsList[index]?.nameRu);
      const correctAnswer = breedsList[currentBreedIndex]?.nameRu;

      setDogInfo((prevDogInfo) => ({
        ...prevDogInfo,
        options: shuffleArray([...options, correctAnswer]),
        correctAnswer: correctAnswer,
      }));
    }
  }, [currentBreedIndex, breedsList]);

  // Генерация случайного индекса породы
  const getRandomBreedIndex = () => {
    return Math.floor(Math.random() * breedsList.length);
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

  const nextQuizQuestion = () => {
    setCurrentBreedIndex(getRandomBreedIndex());
  };

  const showTest = () => {
    setActiveComponent("test");
  };

  const showContent = () => {
    setActiveComponent("content");
  };

  const showQuiz = () => {
    setActiveComponent("quiz");
  };

  const showSearch = () => {
    setActiveComponent("search");
  };

  return (
    <div className="app">
      <Header
        showQuiz={showQuiz}
        showContent={showContent}
        showSearch={showSearch}
        showTest={showTest}
      />
      <Main
        activeComponent={activeComponent}
        breedsList={breedsList}
        dogInfo={dogInfo}
        nextQuizQuestion={nextQuizQuestion}
        randomDogBreed={randomDogBreed}
      />
      {/* <Footer /> */}
    </div>
  );
};

export default App;
