// src/App.jsx

import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Alert,
  Box,
  ThemeProvider,
  createTheme,
  CssBaseline
} from '@mui/material';
import { Book as BookIcon } from '@mui/icons-material';

// Componentes
import SearchBar from './components/SearchBar';
import BookCard from './components/BookCard';
import BookModal from './components/BookModal';
import Pagination from './components/Pagination';
import { BookSkeleton } from './components/Loading';

// Hooks
import { useBooks } from './hooks/useBooks';
import { useDebounce } from './hooks/useDebounce';

// Tema (pode ser customizado conforme preferir)
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

function App() {
  const [selectedBook, setSelectedBook] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Estado para o valor do input em tempo real
  const [searchQuery, setSearchQuery] = useState('');
  // Gera o valor "debounced" que só atualiza 500ms após o usuário parar de digitar
  const debouncedQuery = useDebounce(searchQuery, 500);

  // Hook customizado que gerencia toda a lógica de dados dos livros
  const { books, loading, error, isOfflineMode, pagination, fetchBooks, goToPage } = useBooks();

  // EFEITO UNIFICADO: Lida com a busca inicial e as buscas do usuário
  useEffect(() => {
    // Na montagem, debouncedQuery é '', então `|| '*'` garante a busca inicial.
    // Quando o usuário digita, o valor de debouncedQuery é usado.
    fetchBooks(debouncedQuery || '*', 1);
  }, [debouncedQuery, fetchBooks]); // Depende do valor debounced e da função estável fetchBooks

  // Função para o SearchBar: apenas atualiza o estado do input
  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  // Função para o Pagination: navega para a nova página mantendo a busca atual
  const handlePageChange = (newPage) => {
    goToPage(newPage, debouncedQuery || '*');
  };

  // Funções para controlar o modal de detalhes do livro
  const handleBookClick = (book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBook(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="min-h-screen bg-gray-50">
        <Container maxWidth="xl" className="">
          {/* Header */}
      <header className="starry-bg flex justify-center items-center top-0 w-full z-40 py-8">
        <div className="text-center">
          <h1 className="absolute left-16 text-4xl font-bold text-white">
            e-books
          </h1>
          <h2 className="mt-20 text-3xl font-bold text-white">
            Descubra sua nova história aqui!
          </h2>
          <h3 className="mt-4 font-light text-white/80">Encontre informações sobre os mais diversos livros do mundo em um lugar só.</h3>
          <div className="sticky w-full max-w-2xl">
            <SearchBar value={searchQuery} onSearchChange={handleSearchChange} />
          </div>
        </div>
      </header>

          {/* Mensagens de status para o usuário */}
          {error && <Alert severity="error" className="my-6">{error}</Alert>}

          {!loading && books.length > 0 && isOfflineMode && (
            <Alert severity="info" className="my-6">
              <strong>Modo offline:</strong> Tivemos problemas com o servidor, mas aqui estão alguns livros que você pode gostar! Realize uma nova pesquisa o atualize a página para tentar reestabelecer o site.
            </Alert>
          )}

          {/* Conteúdo principal */}
          <Box className="min-h-[60vh]">
            {loading ? (
              <BookSkeleton count={10} />
            ) : books.length > 0 ? (
              <>
                <div className="py-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-8">
                  {books.map((book) => (
                    <BookCard
                      key={book.key}
                      book={book}
                      onBookClick={handleBookClick}
                    />
                  ))}
                </div>
                <Pagination
                  pagination={pagination}
                  onPageChange={handlePageChange}
                />
              </>
            ) : (
              // Estado de "Nenhum resultado"
              <Box className="text-center py-16">
                <Typography variant="h5" className="text-gray-500 mb-4">
                  Nenhum livro encontrado
                </Typography>
                <Typography variant="body1" className="text-gray-400">
                  Tente ajustar sua busca ou aguarde a API ficar disponível.
                </Typography>
              </Box>
            )}
          </Box>
        </Container>
        
        {/* Modal de Detalhes */}
        <BookModal book={selectedBook} open={isModalOpen} onClose={handleCloseModal} />
      </div>
    </ThemeProvider>
  );
}

export default App;