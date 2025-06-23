import { useQuery } from '@tanstack/react-query';
import { pokimonApi } from '../api/pokimon';

export const usePokimon = (pokimonUrl: string) => {
  const pokimonId = pokimonUrl?.split('/')[pokimonUrl.split('/').length - 2] || '';
  return useQuery({
    queryKey: ['pokimon', pokimonId],
    queryFn: () => pokimonApi.getOne({ url: pokimonUrl }),
    enabled: !!pokimonUrl,
  });
};
