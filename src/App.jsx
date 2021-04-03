import React, { Fragment } from "react";
import "./assets/styles/app.scss";
import Header from "./components/Header/header";
import PokeCard from "./components/PokeCard/PokeCard";
class App extends React.Component {
  render() {
    return (
      <Fragment>
        <Header />
        <PokeCard />
      </Fragment>
    );
  }
}

export default App;
