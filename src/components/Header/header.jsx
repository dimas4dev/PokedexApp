import React from "react";
import Pikachu from "../../assets/images/pikachu-icon.png";
import Pokeball from "../../assets/images/pokeball.png";
import "../../assets/styles/header/header.scss";

const header = () => {
  return (
    <header className="Header">
      <img src={Pikachu} alt="LogoPikachu" className="Header__Logo" />
      <h1 className="Header--title">Pokedex</h1>
      <img src={Pokeball} alt="LogoPokeball" className="Header__Logo" />
    </header>
  );
};

export default header;
