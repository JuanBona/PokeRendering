export default async function ISR() {
    const res = await fetch('https://pokeapi.co/api/v2/pokemon/ditto', {
      next: { revalidate: 60 }, // Regenerar cada 60 segundos
    });
    const pokemon = await res.json();
  
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
  }
  