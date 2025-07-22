import axios from 'axios';

const BASE_URL = 'https://openlibrary.org';

// Cliente axios configurado
const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 30000, // Reduzindo para 10 segundos
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para tratamento de erros
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Log mais limpo - apenas em desenvolvimento
    if (process.env.NODE_ENV === 'development') {
      console.warn('API Error:', error.message);
    }
    
    // Tratamento específico para diferentes tipos de erro
    if (error.code === 'ECONNABORTED') {
      throw new Error('Tempo limite excedido. Tente novamente.');
    }
    
    if (error.response?.status === 500) {
      throw new Error('Servidor temporariamente indisponível. Tente novamente em alguns minutos.');
    }
    
    if (error.response?.status === 429) {
      throw new Error('Muitas requisições. Aguarde um momento antes de tentar novamente.');
    }
    
    throw new Error(
      error.response?.data?.message || 
      error.message || 
      'Erro ao conectar com a API'
    );
  }
);

/**
 * Função para fazer retry de requisições
 * @param {Function} fn - Função a ser executada
 * @param {number} maxRetries - Número máximo de tentativas
 * @returns {Promise} Resultado da função
 */
const retryRequest = async (fn, maxRetries = 1) => {
  for (let i = 0; i <= maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === maxRetries) throw error;
      
      // Aguarda antes de tentar novamente (backoff exponencial)
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000));
    }
  }
};

/**
 * Busca livros na API da OpenLibrary
 * @param {string} query - Termo de busca
 * @param {number} page - Página atual (padrão: 1)
 * @param {number} limit - Limite de resultados (padrão: 25)
 * @returns {Promise<Object>} Dados dos livros encontrados
 */
export const searchBooks = async (query = '*', page = 1, limit = 25) => {
  try {
    const response = await retryRequest(async () => {
      return await apiClient.get('/search.json', {
        params: {
          q: query,
          page,
          limit,
          fields: 'title,author_name,cover_i,first_publish_year,key,number_of_pages_median,publisher,edition_count,subject,language'
        }
      });
    });

    return {
      books: response.data.docs || [],
      totalResults: response.data.num_found || 0,
      start: response.data.start || 0,
      page,
      limit
    };
  } catch (error) {
    // Log mais limpo
    if (process.env.NODE_ENV === 'development') {
      console.warn('Erro na busca:', error.message);
    }
    throw error;
  }
};

/**
 * Obtém detalhes de um livro específico
 * @param {string} bookKey - Chave única do livro
 * @returns {Promise<Object>} Detalhes completos do livro
 */
export const getBookDetails = async (bookKey) => {
  try {
    const response = await apiClient.get(`/works/${bookKey}.json`);
    return response.data;
  } catch (error) {
    console.error('Erro ao obter detalhes do livro:', error);
    throw error;
  }
};

/**
 * Gera URL da capa do livro
 * @param {number} coverId - ID da capa
 * @param {string} size - Tamanho da imagem (S, M, L)
 * @returns {string} URL da imagem da capa
 */
export const getCoverUrl = (coverId, size = 'M') => {
  if (!coverId) return null;
  return `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`;
};

/**
 * Gera URL de placeholder para livros sem capa
 * @param {string} title - Título do livro
 * @returns {string} URL do placeholder
 */
export const getPlaceholderUrl = (title) => {
  const encodedTitle = encodeURIComponent(title || 'Book');
  return `https://via.placeholder.com/300x400/cccccc/666666?text=${encodedTitle}`;
};

/**
 * Dados de exemplo para quando a API estiver indisponível
 */
const fallbackBooks = [
  {
    title: "O Senhor dos Anéis",
    author_name: ["J.R.R. Tolkien"],
    first_publish_year: 1954,
    cover_i: 14625765,
    key: "OL27448W",
    edition_count: 120,
    number_of_pages_median: 1216,
    publisher: ["Allen & Unwin"]
  },
  {
    title: "1984",
    author_name: ["George Orwell"],
    first_publish_year: 1949,
    cover_i: 9267242,
    key: "OL47804W",
    edition_count: 85,
    number_of_pages_median: 328,
    publisher: ["Secker & Warburg"]
  },
  {
    title: "O Pequeno Príncipe",
    author_name: ["Antoine de Saint-Exupéry"],
    first_publish_year: 1943,
    cover_i: 8570014,
    key: "OL45804W",
    edition_count: 95,
    number_of_pages_median: 96,
    publisher: ["Reynal & Hitchcock"]
  },
  {
    title: "Dom Casmurro",
    author_name: ["Machado de Assis"],
    first_publish_year: 1899,
    cover_i: 647501,
    key: "OL12345W",
    edition_count: 45,
    number_of_pages_median: 256,
    publisher: ["Livraria Garnier"]
  },
  {
    title: "Grande Sertão: Veredas",
    author_name: ["João Guimarães Rosa"],
    first_publish_year: 1956,
    cover_i: 13946180,
    key: "OL67890W",
    edition_count: 32,
    number_of_pages_median: 624,
    publisher: ["José Olympio"]
  },
  {
    title: "Capitães da Areia",
    author_name: ["Jorge Amado"],
    first_publish_year: 1937,
    cover_i: 4178919,
    key: "OL34567W",
    edition_count: 67,
    number_of_pages_median: 288,
    publisher: ["José Olympio"]
  },
  {
    title: "Vidas Secas",
    author_name: ["Graciliano Ramos"],
    first_publish_year: 1938,
    cover_i: 12369687,
    key: "OL90123W",
    edition_count: 28,
    number_of_pages_median: 176,
    publisher: ["José Olympio"]
  },
  {
    title: "Macunaíma",
    author_name: ["Mário de Andrade"],
    first_publish_year: 1928,
    cover_i: 6921967,
    key: "OL56789W",
    edition_count: 41,
    number_of_pages_median: 208,
    publisher: ["Livraria Martins"]
  }
];

/**
 * Busca livros com fallback para dados de exemplo
 */
export const searchBooksWithFallback = async (query = '*', page = 1, limit = 25) => {
  try {
    return await searchBooks(query, page, limit);
  } catch (error) {
    console.info('📚 Usando dados de exemplo - API indisponível');
    
    // Se a query for '*' ou vazia, retorna todos os livros
    if (query === '*' || query.trim() === '') {
      return {
        books: fallbackBooks,
        totalResults: fallbackBooks.length,
        start: 0,
        page: 1,
        limit: fallbackBooks.length
      };
    }
    
    // Retorna dados de exemplo filtrados pela query
    const filteredBooks = fallbackBooks.filter(book => 
      book.title.toLowerCase().includes(query.toLowerCase()) ||
      book.author_name.some(author => 
        author.toLowerCase().includes(query.toLowerCase())
      )
    );
    
    return {
      books: filteredBooks,
      totalResults: filteredBooks.length,
      start: 0,
      page: 1,
      limit: filteredBooks.length
    };
  }
};

export default {
  searchBooks,
  searchBooksWithFallback,
  getBookDetails,
  getCoverUrl,
  getPlaceholderUrl
}; 