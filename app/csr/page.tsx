'use client'; // Asegura que este componente se renderice solo en el cliente
import { useEffect, useState } from 'react';

interface Pokemon {
  name: string;
  weight: number;
  height: number;
  base_experience: number;
  sprites: {
    front_default: string;
  };
}

export default function CSR() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    const fetchPokemons = async () => {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=50');
      const data = await response.json();

      const promises = data.results.map((pokemon: { name: string; url: string }) =>
        fetch(pokemon.url).then(res => res.json())
      );
      const results = await Promise.all(promises);
      setPokemons(results);
    };

    fetchPokemons();
  }, []);

  if (pokemons.length === 0) return <div>Loading...</div>;

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
}
