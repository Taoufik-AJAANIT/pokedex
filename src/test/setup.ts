import '@testing-library/jest-dom';
import { vi } from 'vitest';

const intersectionObserverMock = () => ({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null,
});

window.IntersectionObserver = vi.fn().mockImplementation(intersectionObserverMock); 