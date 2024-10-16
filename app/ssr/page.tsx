// app/ssr/page.tsx
import React from 'react';

async function fetchPokemons() {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=50', {
    cache: 'no-store', // Asegura que siempre obtienes datos frescos
  });
  const data = await res.json();

  // Obtener los detalles de cada Pokémon
  const pokemonDetails = await Promise.all(
    data.results.map((pokemon: { url: string }) =>
      fetch(pokemon.url, { cache: 'no-store' }).then((res) => res.json())
    )
  );

  return pokemonDetails;
}

const SSR = async () => {
  const pokemons = await fetchPokemons();

  return (
    <div className="grid-container">
      {pokemons.map((pokemon) => (
        <div key={pokemon.name} className="pokemon-card">
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
      ))}
    </div>
  );
};

export default SSR;