// src/hooks/useFavorites.js

import { useState, useEffect, useCallback } from 'react';

const FAVORITES_KEY = 'bookFavorites';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);

  // Carrega os favoritos do localStorage na primeira vez que o hook é usado
  useEffect(() => {
    try {
      const storedFavorites = localStorage.getItem(FAVORITES_KEY);
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error("Erro ao carregar favoritos do localStorage:", error);
    }
  }, []);

  // Salva os favoritos no localStorage sempre que a lista muda
  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    } catch (error) {
      console.error("Erro ao salvar favoritos no localStorage:", error);
    }
  }, [favorites]);

  const isFavorite = useCallback((bookKey) => {
    return favorites.some(book => book.key === bookKey);
  }, [favorites]);

  const toggleFavorite = useCallback((book) => {
    setFavorites(prevFavorites => {
      const isAlreadyFavorite = prevFavorites.some(fav => fav.key === book.key);
      if (isAlreadyFavorite) {
        // Remove o livro dos favoritos
        return prevFavorites.filter(fav => fav.key !== book.key);
      } else {
        // Adiciona o livro aos favoritos
        return [...prevFavorites, book];
      }
    });
  }, []);

  return { favorites, toggleFavorite, isFavorite };
};