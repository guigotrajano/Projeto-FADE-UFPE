// src/hooks/useSearchHistory.js

import { useState, useCallback } from 'react';

const HISTORY_KEY = 'bookSearchHistory';

export const useSearchHistory = (maxSize = 5) => {
  const [history, setHistory] = useState(() => {
    try {
      const storedHistory = localStorage.getItem(HISTORY_KEY);
      return storedHistory ? JSON.parse(storedHistory) : [];
    } catch (error) {
      console.error("Erro ao carregar histórico do localStorage:", error);
      return [];
    }
  });

  const addSearchTerm = useCallback((term) => {
    if (!term) return;

    setHistory(prevHistory => {
      // Remove o termo se ele já existir para movê-lo para o topo
      const newHistory = prevHistory.filter(item => item.toLowerCase() !== term.toLowerCase());
      
      // Adiciona o novo termo no início
      newHistory.unshift(term);
      
      // Limita o tamanho do histórico
      const limitedHistory = newHistory.slice(0, maxSize);

      // Salva no localStorage
      try {
        localStorage.setItem(HISTORY_KEY, JSON.stringify(limitedHistory));
      } catch (error) {
        console.error("Erro ao salvar histórico no localStorage:", error);
      }
      
      return limitedHistory;
    });
  }, [maxSize]);

  return { history, addSearchTerm };
};