import React, { useState, useEffect } from "react";
import "./Content.scss";

function Content() {
  const [dogImages, setDogImages] = useState([]);
  const [dogBreeds, setDogBreeds] = useState([]);
  const [dogTemperaments, setDogTemperaments] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      return fetch("https://dogsbreed.store/dogbreeds/random")
        .then((response) => response.json())
        .then((data) => {
          const images = data.map((breed) => breed.imagePath);
          const breeds = data.map((breed) => breed.nameRu);
          const temperaments = data.map((breed) => breed.description);

          setDogImages(images);
          setDogBreeds(breeds);
          setDogTemperaments(temperaments);
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

  return (
    <div className="content">
      <h2 className="content__title">Собаки</h2>
      <div className="content__items">
        {dogImages.map((image, index) => (
          <div className="content__item" key={index}>
            <img className="content__img" src={image} alt="" />
            <div className="content__container">
              <h3 className="content__card-name">{dogBreeds[index]}</h3>
              <p className="content__description">{dogTemperaments[index]}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Content;
