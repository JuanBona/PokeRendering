export default async function ISR() {
  // Obtener la lista de los primeros 50 Pokémon
  const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=50', {
    next: { revalidate: 60 }, // Revalidar cada 60 segundos
  });
  const data = await res.json();

  // Hacer fetch para obtener detalles de cada uno de los 50 Pokémon
  const promises = data.results.map((pokemon: { url: string }) =>
    fetch(pokemon.url).then((res) => res.json())
  );
  const pokemons = await Promise.all(promises); // Esperar a que todas las promesas terminen

  return (
    <div className="grid-container">
      {/* Mapear y renderizar todos los Pokémon */}
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