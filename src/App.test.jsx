// src/App.test.jsx

import React from 'react';
import { render, screen } from '@testing-library/react';
// A linha 'import { describe, it, expect, vi } from 'vitest';' foi REMOVIDA.

import App from './App';

// Trocamos 'vi.mock' por 'jest.mock'
jest.mock('./hooks/useBooks', () => ({
  useBooks: () => ({
    books: [],
    loading: true, // Forçamos o estado de carregamento
    error: null,
    pagination: {},
    fetchBooks: jest.fn(), // Trocamos 'vi.fn' por 'jest.fn'
  }),
}));

jest.mock('./hooks/useFavorites', () => ({
  useFavorites: () => ({
    favorites: [],
    toggleFavorite: jest.fn(),
    isFavorite: jest.fn(),
  }),
}));

jest.mock('./hooks/useSearchHistory', () => ({
  useSearchHistory: () => ({
    history: [],
    addSearchTerm: jest.fn(),
  }),
}));

describe('App', () => {
  it('renders skeleton components when in loading state', () => {
    render(<App />);

    const skeletons = screen.getAllByTestId('book-skeleton');
    expect(skeletons.length).toBeGreaterThan(0);
  });
});