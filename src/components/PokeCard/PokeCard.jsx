import React, { useEffect, useState } from "react";
import "../../assets/styles/PokeCard/PokeCard.scss";

const PokeCard = () => {
  const urlPokemons = "https://pokeapi.co/api/v2/";
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
    const jsonPokemons = await fetch(
      `${urlPokemons}pokemon?offset=0&limit=1118`
    ).then((response) => response.json());
    const arrayPokemons = [...jsonPokemons.results];

    return arrayPokemons;
  }
  async function getPokemonDescription(pokemon) {
    const getDescription = await fetch(
      `${urlPokemons}pokemon/${pokemon}`
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
        {Pokemon.name}
      </div>
    ));
    return listPokemon;
  }
  useEffect(
    () =>
      (async () => {
        const Pokemons = await getPokemons();
        setNamePokemon(Pokemons);
      })(),
    [true]
  );

  return (
    <section className="MainContainer">
      <article className="PokeContainer">
        <PokemonList />
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
