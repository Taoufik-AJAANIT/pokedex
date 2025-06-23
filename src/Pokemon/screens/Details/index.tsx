import { usePokimon } from '../../hooks/usePokimon';
import type { Ability, Type, Stat } from '../../types/api/details';

interface PokimonDetailsProps {
  pokimonUrl: string;
  onClose: () => void;
}

const PokimonDetails: React.FC<PokimonDetailsProps> = ({ pokimonUrl, onClose }) => {
  const { data: pokimon, isLoading, isError } = usePokimon(pokimonUrl);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-gray-800 text-white p-5 rounded-lg">
          <div>Loading...</div>
        </div>
      </div>
    );
  }

  if (isError || !pokimon) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-gray-800 text-white p-5 rounded-lg">
          <div>Error fetching data</div>
          <button
            onClick={onClose}
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4"
      onClick={onClose}
    >
      <div className="bg-gray-800 text-white rounded-lg max-w-sm w-full max-h-full overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center p-5 sticky top-0 bg-gray-800 border-b border-gray-700 z-10">
          <h2 className="text-2xl font-bold capitalize">{pokimon.name}</h2>
          <button
            onClick={onClose}
            className="text-white"
          >
            &times;
          </button>
        </div>
        <div className="p-5">
          <img
            src={pokimon.sprites.other?.['official-artwork']?.front_default || pokimon.sprites.front_default || ''}
            alt={pokimon.name}
            className="w-48 h-48 mx-auto"
          />
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <h3 className="text-xl font-semibold">Info</h3>
              <p>Height: {pokimon.height / 10} m</p>
              <p>Weight: {pokimon.weight / 10} kg</p>
              <p>Base Exp: {pokimon.base_experience}</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold">Types</h3>
              <ul className="list-disc list-inside">
                {pokimon.types.map((type: Type) => (
                  <li key={type.type.name} className="capitalize">{type.type.name}</li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold mt-4">Abilities</h3>
            <ul className="list-disc list-inside">
              {pokimon.abilities.map((ability: Ability) => (
                <li key={ability.ability.name} className="capitalize">{ability.ability.name}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mt-4">Stats</h3>
            <ul className="list-disc list-inside">
              {pokimon.stats.map((stat: Stat) => (
                <li key={stat.stat.name} className="capitalize">{stat.stat.name}: {stat.base_stat}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokimonDetails; 