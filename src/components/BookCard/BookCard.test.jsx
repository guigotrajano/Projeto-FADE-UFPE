// src/components/BookCard/BookCard.test.jsx

import React from 'react';
import { render, screen } from '@testing-library/react';
import BookCard from './BookCard';

// Trocamos 'vi.mock' por 'jest.mock'
jest.mock('../../utils/helpers', () => ({
  formatAuthors: (authors) => authors?.join(', ') || 'Autor desconhecido',
  formatYear: (year) => year || 'Ano desconhecido',
  truncateText: (text) => text,
}));

jest.mock('../../services/openLibraryAPI', () => ({
  getCoverUrl: (id) => `https://covers.openlibrary.org/b/id/${id}-M.jpg`,
  getPlaceholderUrl: () => 'https://via.placeholder.com/128x192.png',
}));

describe('BookCard', () => {
  it('renders book information correctly', () => {
    const mockBook = {
      title: 'O Guia do Mochileiro das Galáxias',
      author_name: ['Douglas Adams'],
      first_publish_year: 1979,
      cover_i: 12345,
    };

    render(<BookCard book={mockBook} />);

    expect(screen.getByText('O Guia do Mochileiro das Galáxias')).toBeInTheDocument();
    expect(screen.getByText('Douglas Adams')).toBeInTheDocument();
    expect(screen.getByText('1979')).toBeInTheDocument();
  });
});