import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { usePokimon } from './usePokimon';
import React from 'react';
import { describe, it, expect, beforeAll, afterEach, afterAll } from 'vitest';

const server = setupServer(
  http.get(`${import.meta.env.VITE_POKEAPI_BASE_URL}/pokemon/1`, () => {
    return HttpResponse.json({ name: 'bulbasaur' });
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('usePokimon', () => {
  it('should fetch and return a pokimon', async () => {
    const wrapper = createWrapper();
    const { result } = renderHook(() => usePokimon(`${import.meta.env.VITE_POKEAPI_BASE_URL}/pokemon/1`), { wrapper });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data?.name).toBe('bulbasaur');
  });
}); 