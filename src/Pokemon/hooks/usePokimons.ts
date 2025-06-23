import { useInfiniteQuery } from '@tanstack/react-query';
import { pokimonApi } from "../api/pokimon";
import type { Pokimons, PokimonsResult } from "../types/api/list";

export const usePokimons = () => {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery<Pokimons, Error, PokimonsResult[], [string], string | undefined>({
    queryKey: ['pokimons'],
    queryFn: ({ pageParam }) => pokimonApi.get({ pageParam }),
    initialPageParam: undefined,
    getNextPageParam: lastPage => lastPage.next || undefined,
    getPreviousPageParam: firstPage => firstPage.previous || undefined,
    select: data => data.pages.flatMap(page => page.results),
  });

  return {
    pokemons: data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  };
}
