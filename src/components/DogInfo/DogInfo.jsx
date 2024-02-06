import React, { useState, useEffect } from "react";
import { apiUrl } from "../../utils/config";

import "./DogInfo.scss";

const DogInfo = ({ breed }) => {
  const [dogImages, setDogImages] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      return fetch(apiUrl + `dogbreeds/${breed}`)
        .then((response) => response.json())
        .then((data) => {
          const images = data.imagePath;

          setDogImages(images);
        })
        .catch((err) => {
          console.error(err);
        });
    };

    fetchData(); // Выполняем запрос сразу, при первом рендере
  }, [breed]);

  if (breed) {
    return (
      <div className="doginfo">
        <img className="doginfo__img" src={dogImages} alt={breed} />
      </div>
    );
  } else {
    return (
      <div className="doginfo">
        <p className="doginfo__txt">Порода собаки не найдена:(</p>
      </div>
    );
  }
};

export default DogInfo;
