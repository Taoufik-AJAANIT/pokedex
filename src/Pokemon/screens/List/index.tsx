import { useRef, useCallback, useState } from 'react';
import { usePokimons } from '../../hooks/usePokimons';
import PokimonDetails from '../Details';

function PokimonList() {
  const {
    pokemons,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = usePokimons();
  const [selectedPokimon, setSelectedPokimon] = useState<string | null>(null);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastPokimonRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isFetchingNextPage) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });
      if (node) observer.current.observe(node);
    },
    [isFetchingNextPage, fetchNextPage, hasNextPage]
  );

  if (status === 'pending') return <p>Loading...</p>;
  if (status === 'error') return <p>Error: {error?.message}</p>;

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold my-6 text-center">Pokémon List</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {pokemons?.map((pokemon, i, allPokemons) => {
          const isLast = i === allPokemons.length - 1;
          const pokemonId =
            pokemon.url.split('/')[pokemon.url.split('/').length - 2];
          const imageUrl = `${import.meta.env.VITE_POKEAPI_IMAGE_BASE_URL}/${pokemonId}.png`;
          return (
            <div
              key={pokemon.name}
              ref={isLast ? lastPokimonRef : undefined}
              className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center transition-transform transform hover:scale-105 cursor-pointer"
              onClick={() => setSelectedPokimon(pokemon.url)}
            >
              <img
                src={imageUrl}
                alt={pokemon.name}
                className="w-32 h-32"
              />
              <p className="text-lg text-black font-semibold capitalize mt-2">
                {pokemon.name}
              </p>
            </div>
          );
        })}
      </div>
      {isFetchingNextPage && (
        <p className="text-center py-4">Loading more...</p>
      )}
      {!hasNextPage && (
        <p className="text-center py-4 text-gray-500">No more Pokémon!</p>
      )}
      {selectedPokimon && (
        <PokimonDetails
          pokimonUrl={selectedPokimon}
          onClose={() => setSelectedPokimon(null)}
        />
      )}
    </div>
  );
}

export default PokimonList;
