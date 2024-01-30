import "./SearchDog.scss";

import InputBreed from "../InputBreed/InputBreed";
import DogInfo from "../DogInfo/DogInfo";

export default function SearchDog({
  breedName,
  handleInputChange,
  handleButtonClick,
  selectedBreed,
  handleChoiceBreed,
  breedsList,
}) {
  return (
    <div className="searchdog">
      <h3 className="searchdog__title">Поиск породы</h3>
      <InputBreed
        breedName={breedName}
        handleInputChange={handleInputChange}
        handleButtonClick={handleButtonClick}
        selectedBreed={selectedBreed}
        handleChoiceBreed={handleChoiceBreed}
        breedsList={breedsList}
      />
      <DogInfo breed={selectedBreed} />
    </div>
  );
}
