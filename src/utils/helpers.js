/**
 * Formata o nome dos autores para exibição
 * @param {Array} authors - Array de nomes de autores
 * @returns {string} String formatada com autores
 */
export const formatAuthors = (authors) => {
  if (!authors || !Array.isArray(authors) || authors.length === 0) {
    return 'Autor desconhecido';
  }
  
  if (authors.length === 1) {
    return authors[0];
  }
  
  if (authors.length === 2) {
    return `${authors[0]} e ${authors[1]}`;
  }
  
  return `${authors[0]}, ${authors[1]} e outros`;
};

/**
 * Formata o ano de publicação
 * @param {number} year - Ano de publicação
 * @returns {string} Ano formatado ou "Ano desconhecido"
 */
export const formatYear = (year) => {
  if (!year || isNaN(year)) {
    return 'Ano desconhecido';
  }
  return year.toString();
};

/**
 * Formata o número de páginas
 * @param {number} pages - Número de páginas
 * @returns {string} Páginas formatadas
 */
export const formatPages = (pages) => {
  if (!pages || isNaN(pages)) {
    return 'Páginas não informadas';
  }
  return `${pages} páginas`;
};

/**
 * Formata a editora
 * @param {Array} publishers - Array de editoras
 * @returns {string} Editora formatada
 */
export const formatPublisher = (publishers) => {
  if (!publishers || !Array.isArray(publishers) || publishers.length === 0) {
    return 'Editora não informada';
  }
  return publishers[0];
};

/**
 * Trunca texto se exceder o limite
 * @param {string} text - Texto a ser truncado
 * @param {number} maxLength - Comprimento máximo
 * @returns {string} Texto truncado
 */
export const truncateText = (text, maxLength = 100) => {
  if (!text || text.length <= maxLength) {
    return text;
  }
  return `${text.substring(0, maxLength)}...`;
};

/**
 * Calcula o número total de páginas
 * @param {number} totalResults - Total de resultados
 * @param {number} limit - Limite por página
 * @returns {number} Número total de páginas
 */
export const calculateTotalPages = (totalResults, limit) => {
  return Math.ceil(totalResults / limit);
};

/**
 * Verifica se um valor está vazio ou nulo
 * @param {any} value - Valor a ser verificado
 * @returns {boolean} True se vazio
 */
export const isEmpty = (value) => {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string') return value.trim() === '';
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === 'object') return Object.keys(value).length === 0;
  return false;
};

/**
 * Gera um ID único simples
 * @returns {string} ID único
 */
export const generateId = () => {
  return Math.random().toString(36).substr(2, 9);
};

export default {
  formatAuthors,
  formatYear,
  formatPages,
  formatPublisher,
  truncateText,
  calculateTotalPages,
  isEmpty,
  generateId
}; 