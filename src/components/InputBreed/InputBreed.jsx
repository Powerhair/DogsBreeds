import "./InputBreed.scss";

import React, { useState, useEffect } from "react";
import { apiUrl } from "../../utils/config";

export default function InputBreed({
  selectedBreed,
  handleChoiceBreed,
  breedsList,
}) {
  const [dogBreeds, setDogBreeds] = useState([]);
  const [dogTemperaments, setDogTemperaments] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      return fetch(apiUrl + `dogbreeds/${selectedBreed}`)
        .then((response) => response.json())
        .then((data) => {
          const breeds = data.nameRu;
          const temperaments = data.description;

          setDogBreeds(breeds);
          setDogTemperaments(temperaments);
        })
        .catch((err) => {
          console.error(err);
        });
    };

    fetchData(); // Выполняем запрос сразу, при первом рендере
  }, [selectedBreed]);
  return (
    <div className="inputbreed">
      <h1 className="inputbreed__title">Выбери породу собаки:</h1>
      <select
        className="inputbreed__select"
        value={selectedBreed}
        onChange={handleChoiceBreed}
      >
        <option value="">Выберите породу</option>
        {breedsList.map((breed) => (
          <option key={breed.id} value={breed.nameEn}>
            {breed.nameEn}
          </option>
        ))}
      </select>
      <div className="inputbreed__description">
        <h2 className="inputbreed__dogname">{dogBreeds} </h2>

        <p className="inputbreed__text">{dogTemperaments}</p>
      </div>
    </div>
  );
}
