// app/ssg/page.tsx
import React from 'react';

// Esta función se ejecuta en el tiempo de construcción
async function fetchPokemons() {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=50');
  const data = await res.json();

  // Obtener los detalles de cada Pokémon
  const pokemonDetails = await Promise.all(
    data.results.map((pokemon: { url: string }) =>
      fetch(pokemon.url).then((res) => res.json())
    )
  );

  return pokemonDetails; // Regresamos el array con los detalles de los Pokémon
}

// Exportamos esta constante para forzar la generación estática
export const dynamic = 'force-static'; // Esto asegura que se renderice estáticamente

const SSG = async () => {
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

export default SSG;