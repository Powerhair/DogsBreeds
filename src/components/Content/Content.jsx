import "./Content.scss";

function Content({ randomDogImage, randomDogBreeds, randomDogTemperaments }) {
  return (
    <div className="content">
      <h2 className="content__title">Собаки</h2>
      <div className="content__items">
        {randomDogImage.map((image, index) => (
          <div className="content__item" key={index}>
            <img className="content__img" src={image} alt="" />
            <div className="content__container">
              <h3 className="content__card-name">{randomDogBreeds[index]}</h3>
              <p className="content__description">
                {randomDogTemperaments[index]}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Content;
