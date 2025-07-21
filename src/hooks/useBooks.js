// src/hooks/useBooks.js

import { useState, useCallback } from 'react';
import { searchBooksWithFallback } from '../services/openLibraryAPI';

const PAGE_LIMIT = 25;

export const useBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isOfflineMode, setIsOfflineMode] = useState(false);
  const [pagination, setPagination] = useState({ page: 1, totalResults: 0 });

  const fetchBooks = useCallback(async (query = '*', page = 1) => {
    setLoading(true);
    setError(null);
    setIsOfflineMode(false);
    try {
      const result = await searchBooksWithFallback(query, page, PAGE_LIMIT);
      
      // O fallback retorna 'books', a API retorna 'docs'
      const booksData = result.books || result.docs || [];
      setBooks(booksData);
      
      // Verifica se está usando fallback (dados de exemplo)
      const isUsingFallback = result.books && result.books.length > 0 && 
                             result.books.some(book => 
                               book.title === "O Senhor dos Anéis" || 
                               book.title === "Dom Casmurro"
                             );
      
      setIsOfflineMode(isUsingFallback);
      
      setPagination({
        page: page,
        // O fallback retorna 'totalResults', a API retorna 'numFound'
        totalResults: result.totalResults || result.numFound || 0,
      });
    } catch (err) {
      setError(err.message);
      setBooks([]);
    } finally {
      setLoading(false);
    }
  }, []); // ✅ Sem dependências, a função é estável

  const goToPage = useCallback((newPage, query = '*') => {
    // A validação de página pode ser feita antes de chamar, ou aqui dentro
    fetchBooks(query, newPage);
  }, [fetchBooks]); // ✅ Dependência estável

  // As outras funções de paginação (next, prev, etc.) não são estritamente
  // necessárias no hook se o componente de Paginação calcular isso.
  // Manteremos apenas `goToPage` para simplificar e garantir a estabilidade.

  return {
    books,
    loading,
    error,
    isOfflineMode,
    pagination: { ...pagination, limit: PAGE_LIMIT },
    fetchBooks,
    goToPage,
  };
};

export default useBooks;