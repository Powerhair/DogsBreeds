import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import "./Test.scss";

export default function Test({ breedList }) {
  const [name, setName] = useState("");
  const [date, setDate] = useState(null);
  // const [doneSum, setDoneSum] = useState(0);
  const [selectedBreed, setSelectedBreed] = useState({});

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (name && date) {
      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0); // Сбрасываем время до начала дня

      if (date < currentDate) {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        let numericDate = new Date(year, month - 1, day).getTime();

        if (numericDate < 0) {
          numericDate *= -1; // Преобразуем отрицательное значение в положительное
        }

        // Преобразование имени в числовое значение (сумма ASCII-кодов символов)
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

        // setDoneSum(
        //   digitsSum > breedList.length || digitsSum === 0
        //     ? breedList.length
        //     : digitsSum
        // );

        setSelectedBreed(breedList[digitsSum - 1]);

        setName("");
        setDate(null);
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
            Дата рождения:
          </label>
          <DatePicker
            className="test__input"
            id="date"
            selected={date}
            onChange={handleDateChange}
            dateFormat="dd.MM.yyyy"
            placeholderText="Выберите дату"
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
