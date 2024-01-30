import "./Main.scss";

import Content from "../Content/Content";
import Quiz from "../Quiz/Quiz";
import SearchDog from "../SearchDog/SearchDog";
import Test from "../Test/Test";

import React, { useState } from "react";

export default function Main({ breedsList }) {
  const [breedName, setBreedName] = useState("");
  const [selectedBreed, setSelectedBreed] = useState("");

  const handleInputChange = (event) => {
    setBreedName(event.target.value);
  };

  const handleButtonClick = () => {
    setSelectedBreed(breedName);
  };

  function handleChoiceBreed(e) {
    setSelectedBreed(e.target.value);
  }

  return (
    <div className="main">
      <Test breedList={breedsList} />
      <Content />
      <Quiz breeds={breedsList} />
      <SearchDog
        breedName={breedName}
        handleInputChange={handleInputChange}
        handleButtonClick={handleButtonClick}
        selectedBreed={selectedBreed}
        handleChoiceBreed={handleChoiceBreed}
        breedsList={breedsList}
      />
    </div>
  );
}
