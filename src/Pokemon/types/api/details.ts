export type Pokimon = {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  is_default: boolean;
  order: number;
  weight: number;
  abilities: Ability[];
  forms: Form[];
  game_indices: GameIndex[];
  held_items: HeldItem[];
  location_area_encounters: string;
  moves: Move[];
  species: Species;
  sprites: Sprites;
  cries: Cries;
  stats: Stat[];
  types: Type[];
  past_types: PastType[];
  past_abilities: PastAbility[];
};

export type Ability = {
  is_hidden: boolean;
  slot: number;
  ability: {
    name: string;
    url: string;
  };
}

export type Form = {
  name: string;
  url: string;
}

export type GameIndex = {
  game_index: number;
  version: {
    name: string;
    url: string;
  };
}

export type HeldItem = {
  item: {
    name: string;
    url: string;
  };
  version_details: {
    rarity: number;
    version: {
      name: string;
      url: string;
    };
  }[];
}

export type Move = {
  move: {
    name: string;
    url: string;
  };
  version_group_details: {
    level_learned_at: number;
    version_group: {
      name: string;
      url: string;
    };
    move_learn_method: {
      name: string;
      url: string;
    };
    order: number | null;
  }[];
}

export type Species = {
  name: string;
  url: string;
}

export type Sprites = {
  back_default: string | null;
  back_female: string | null;
  back_shiny: string | null;
  back_shiny_female: string | null;
  front_default: string | null;
  front_female: string | null;
  front_shiny: string | null;
  front_shiny_female: string | null;
  other?: {
    dream_world: {
      front_default: string | null;
      front_female: string | null;
    };
    home: {
      front_default: string | null;
      front_female: string | null;
      front_shiny: string | null;
      front_shiny_female: string | null;
    };
    "official-artwork": {
      front_default: string | null;
      front_shiny: string | null;
    };
    showdown: {
      back_default: string | null;
      back_female: string | null;
      back_shiny: string | null;
      back_shiny_female: string | null;
      front_default: string | null;
      front_female: string | null;
      front_shiny: string | null;
      front_shiny_female: string | null;
    };
  };
  versions: {
    [key: string]: {
      [key: string]: {
        back_default?: string | null;
        back_gray?: string | null;
        back_shiny?: string | null;
        front_default?: string | null;
        front_gray?: string | null;
        front_shiny?: string | null;
        back_female?: string | null;
        back_shiny_female?: string | null;
        front_female?: string | null;
        front_shiny_female?: string | null;
        animated?: Sprites;
      };
    };
  };
}

export type Cries = {
  latest: string;
  legacy: string;
}

export type Stat = {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

export type Type = {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export type PastType = {
  generation: {
    name: string;
    url: string;
  };
  types: Type[];
}

export type PastAbility = {
  generation: {
    name: string;
    url: string;
  };
  abilities: {
    ability: {
      name: string;
      url: string;
    } | null;
    is_hidden: boolean;
    slot: number;
  }[];
} 