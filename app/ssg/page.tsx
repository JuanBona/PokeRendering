// app/ssg/page.tsx
import React from 'react';

async function fetchPokemon() {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon/ditto');
  const pokemon = await res.json();
  return pokemon;
}

const SSG = async () => {
  const pokemon = await fetchPokemon();

  return (
    <div className="center-container">
      <div className="pokemon-card">
        <img
          className="pokemon-img"
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
        />
        <div className="pokemon-info">
          <h1>{pokemon.name}</h1>
          <p>Weight: {pokemon.weight}</p>
          <p>Height: {pokemon.height}</p>
          <p>Base Experience: {pokemon.base_experience}</p>
        </div>
      </div>
    </div>
  );
};

export default SSG;


  