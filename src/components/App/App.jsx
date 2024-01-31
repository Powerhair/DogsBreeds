//react
import React, { useState, useEffect } from "react";

//scss
import "./App.scss";

//Components
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

const App = () => {
  const [breedsList, setBreedsList] = useState([]);
  const api = "31.129.102.218:3000";
  const oldApi = "http://localhost:3000/dogbreeds";

  useEffect(() => {
    const fetchData = () => {
      return fetch("https://dogsbreed.store/dogbreeds")
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

  return (
    <div className="app">
      <Header />
      <Main breedsList={breedsList} />
      <Footer />
    </div>
  );
};

export default App;
