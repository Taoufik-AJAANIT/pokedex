import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import PokimonList from './index';
import { describe, it, expect, beforeAll, afterEach, afterAll } from 'vitest';

const server = setupServer(
  http.get(`${import.meta.env.VITE_POKEAPI_BASE_URL}/pokemon`, ({request}) => {
    const url = new URL(request.url)
    const limit = url.searchParams.get('limit')
    return HttpResponse.json({
      results: Array.from({ length: parseInt(limit || '20') }, (_, i) => ({
        name: `pokemon-${i + 1}`,
        url: `${import.meta.env.VITE_POKEAPI_BASE_URL}/pokemon/${i + 1}/`,
      })),
    });
  }),
  http.get(`${import.meta.env.VITE_POKEAPI_BASE_URL}/pokemon/1/`, () => {
    return HttpResponse.json({
      name: 'bulbasaur',
      height: 7,
      weight: 69,
      base_experience: 64,
      types: [{ type: { name: 'grass' } }],
      abilities: [{ ability: { name: 'overgrow' } }],
      stats: [{ stat: { name: 'hp' }, base_stat: 45 }],
      sprites: { other: { 'official-artwork': { front_default: '' } } },
    });
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const renderList = () => {
  render(
    <QueryClientProvider client={queryClient}>
      <PokimonList />
    </QueryClientProvider>
  );
};

describe('PokimonList Integration Test', () => {
  it('should display a list of pokemon and open details modal on click', async () => {
    renderList();
    
    await waitFor(() => {
      expect(screen.getByText('pokemon-1')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('pokemon-1'));

    await waitFor(() => {
      expect(screen.getByText('bulbasaur')).toBeInTheDocument();
      expect(screen.getByText('Height: 0.7 m')).toBeInTheDocument();
    });
  });
}); 