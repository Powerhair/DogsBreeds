import { render } from "@testing-library/react";
import "./Content.scss";

import React, { useState, useEffect } from "react";

function Content({
  randomDogImage,
  randomDogBreeds,
  randomDogTemperaments,
  randomDogBreed,
}) {
  const [dogImages, setDogImages] = useState([]);
  const [dogName, setDogName] = useState([]);
  const [dogDescription, setDogDescription] = useState([]);

  useEffect(() => {
    const images = randomDogBreed.map((breed) => breed.imagePath);
    const breeds = randomDogBreed.map((breed) => breed.nameRu);
    const description = randomDogBreed.map((breed) => breed.description);

    setDogImages(images);
    setDogName(breeds);
    setDogDescription(description);
  }, [randomDogBreed]);

  return (
    <div className="content">
      <h2 className="content__title">Собаки</h2>
      <div className="content__items">
        {dogImages.map((image, index) => (
          <div className="content__item" key={index}>
            <img className="content__img" src={image} alt="" />
            <div className="content__container">
              <h3 className="content__card-name">{dogName[index]}</h3>
              <p className="content__description">{dogDescription[index]}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Content;
