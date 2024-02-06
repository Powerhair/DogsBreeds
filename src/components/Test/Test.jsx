import React, { useState } from "react";
import "./Test.scss";

export default function Test({ breedList }) {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [selectedBreed, setSelectedBreed] = useState({});

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (name && date) {
      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0);

      const [day, month, year] = date.split(".");

      if (year && month && day) {
        let numericDate = new Date(year, parseInt(month) - 1, day).getTime();

        if (numericDate < 0) {
          numericDate *= -1;
        }

        let nameSum = 0;
        for (let i = 0; i < name.length; i++) {
          nameSum += name.charCodeAt(i);
        }

        const digitsSum =
          nameSum
            .toString()
            .split("")
            .reduce((sum, digit) => sum + parseInt(digit), 0) +
          numericDate
            .toString()
            .split("")
            .reduce((sum, digit) => sum + parseInt(digit), 0);

        setSelectedBreed(breedList[digitsSum - 1]);

        setName("");
        setDate("");
      }
    }
  };

  return (
    <div className="test">
      <h1 className="test__title">Кто ты? В мире собак</h1>
      <form className="test__form" onSubmit={handleSubmit}>
        <div className="test__container test__name">
          <label className="test__form-label" htmlFor="name">
            Имя:
          </label>
          <input
            className="test__input"
            type="text"
            id="name"
            value={name}
            onChange={handleNameChange}
            placeholder="Твое имя"
            required
          />
        </div>
        <div className="test__container test__date">
          <label className="test__form-label" htmlFor="date">
            Дата рождения (дд.мм.гггг):
          </label>
          <input
            className="test__input"
            type="text"
            id="date"
            value={date}
            onChange={handleDateChange}
            placeholder="дд.мм.гггг"
            pattern="[0-3][0-9].[0-1][0-9].[0-9]{4}"
            required
          />
        </div>
        <button className="test__button" type="submit">
          Отправить
        </button>
      </form>
      <div className="test__dog-container">
        <h3 className="test__dog-name">
          {selectedBreed && selectedBreed.nameRu}
        </h3>
        <p className="test__dog-description">
          {selectedBreed && selectedBreed.description}
        </p>
        <img
          className="test__dog-img"
          src={selectedBreed && selectedBreed.imagePath}
          alt={selectedBreed && selectedBreed.nameEn}
        />
      </div>
    </div>
  );
}
