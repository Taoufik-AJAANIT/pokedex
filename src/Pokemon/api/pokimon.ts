import type { Pokimon } from "../types/api/details";
import type { Pokimons } from "../types/api/list";

const BASE_URL = `${import.meta.env.VITE_POKEAPI_BASE_URL}/pokemon`;

export const pokimonApi = {
  get: async ({ pageParam }: { pageParam?: string }): Promise<Pokimons> => {
    const url = pageParam || `${BASE_URL}?limit=100`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    return response.json();
  },
  getOne: async ({ url }: { url: string }): Promise<Pokimon> => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    return response.json();
  },
};

