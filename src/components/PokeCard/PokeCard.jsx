import React, { useEffect, useState } from "react";
import "../../assets/styles/PokeCard/PokeCard.scss";

const PokeCard = () => {
  const urlStatic = "https://pokeapi.co/api/v2/";
  const [urlPokemons, setUrlPokemons] = useState(
    "https://pokeapi.co/api/v2/pokemon?limit=12&offset=0"
  );
  const [pokemonName, setNamePokemon] = useState([]);

  const [pokemonDescription, setPokemonDescription] = useState({
    id: 1,
    name: "Bulbasaur",
    type: [],
    abilities: [],
    picture:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
  });

  async function getPokemons() {
    const jsonPokemons = await fetch(`${urlPokemons}`).then((response) =>
      response.json()
    );
    const arrayPokemons = [...jsonPokemons.results];

    return arrayPokemons;
  }

  async function previousPage() {
    const urlPrevious = await fetch(urlPokemons).then((response) =>
      response.json().then((url) => url.previous)
    );

    if (urlPrevious) {
      setUrlPokemons(urlPrevious);
    }
  }
  async function nextPage() {
    const urlNext = await fetch(urlPokemons).then((response) =>
      response.json().then((url) => url.next)
    );
    console.log(urlNext);
    if (urlNext) {
      setUrlPokemons(urlNext);
    }
  }

  async function getPokemonDescription(pokemon) {
    const getDescription = await fetch(
      `${urlStatic}pokemon/${pokemon}`
    ).then((response) => response.json());

    setPokemonDescription({
      id: getDescription.id,
      name: getDescription.name,
      type: [...getDescription.types],
      abilities: [...getDescription.abilities],
      picture: [getDescription.sprites.front_default],
    });
  }

  function PokemonList() {
    const listPokemon = pokemonName.map((Pokemon) => (
      <div
        className="PokeCard"
        key={Pokemon.name}
        onClick={() => getPokemonDescription(Pokemon.name)}
      >
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
            Pokemon.url.split("/")[6]
          }.png`}
          alt=""
        />
        <p>{Pokemon.name}</p>
      </div>
    ));
    return listPokemon;
  }
  useEffect(
    () =>
      (async () => {
        const Pokemons = await getPokemons();
        if (urlStatic) {
          setNamePokemon(Pokemons);
        }
      })(),
    [urlPokemons]
  );

  return (
    <section className="MainContainer">
      <article className="PokeContainer">
        <PokemonList />

        <div className="PokeContainer__Pages">
          <div
            className="PokeContainer__Pages--button"
            onClick={() => previousPage()}
          >
            Previous Page
          </div>
          <div
            className="PokeContainer__Pages--button"
            onClick={() => nextPage()}
          >
            Next Page
          </div>
        </div>
      </article>
      <article className="PokeInformation absolute">
        <img src={pokemonDescription.picture} alt="PokeIcons" />
        <p>ID: {pokemonDescription.id}</p>
        <p>Name: {pokemonDescription.name}</p>
        <p>
          Type: {pokemonDescription.type.map(({ type }) => ` ${type.name}, `)}
        </p>
        <p>
          Ability:
          {pokemonDescription.abilities.map(
            ({ ability }) => `  ${ability.name}, `
          )}
        </p>
      </article>
    </section>
  );
};

export default PokeCard;
