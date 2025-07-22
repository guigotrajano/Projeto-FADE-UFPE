import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Alert,
  Box,
  ThemeProvider,
  createTheme,
  CssBaseline,
  ToggleButton,
  ToggleButtonGroup,
  Button,
} from '@mui/material';
import BookIcon from '@mui/icons-material/Book';
import FilterListIcon from '@mui/icons-material/FilterList';
import TopBar from './components/TopBar/TopBar'; 
import SearchBar from './components/SearchBar';
import BookCard from './components/BookCard';
import BookModal from './components/BookModal';
import Pagination from './components/Pagination';
import { BookSkeleton } from './components/Loading';
import FilterPanel from './components/FilterPanel';
import ScrollToTopButton from './components/ScrollToTopButton/ScrollToTopButton';
import StatsModal from './components/StatsModal/StatsModal';

import { useBooks } from './hooks/useBooks';
import { useDebounce } from './hooks/useDebounce';
import { useSearchHistory } from './hooks/useSearchHistory';
import { useFavorites } from './hooks/useFavorites';

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
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false);

  const [filters, setFilters] = useState({
    decade: 'all',
    pageCount: 'all',
    publisher: null,
    genre: "all",
    language: null
  });

  const [searchQuery, setSearchQuery] = useState('');
  const debouncedQuery = useDebounce(searchQuery, 500);

  const [sortBy, setSortBy] = useState('popular');
    const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  const { history, addSearchTerm } = useSearchHistory();
  const { books, loading, error, isOfflineMode, pagination, fetchBooks, goToPage } = useBooks();

    const { favorites, toggleFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    fetchBooks(debouncedQuery || '*', 1);
  }, [debouncedQuery, fetchBooks]);

  const handleSearchChange = (query) => setSearchQuery(query);
  const handleHistoryClick = (term) => setSearchQuery(term);
  const handlePageChange = (newPage) => goToPage(newPage, debouncedQuery || '*');
  const handleBookClick = (book) => { setSelectedBook(book); setIsModalOpen(true); };
  const handleCloseModal = () => { setIsModalOpen(false); setSelectedBook(null); };
  const handleFilterChange = (name, value) => setFilters(prev => ({ ...prev, [name]: value }));
  const handleStatsModalOpen = () => setIsStatsModalOpen(true);
  const handleStatsModalClose = () => setIsStatsModalOpen(false);
  const handleSearchSubmit = (term) => {
    addSearchTerm(term);
  }
  const handleFavoritesViewToggle = () => {
  setShowOnlyFavorites(prev => !prev);
  };

  const { availableDecades, availablePublishers, availableGenres, availableLanguages } = React.useMemo(() => {
    const decades = new Set(), publishers = new Set(), genres = new Set(), languages = new Set();
    if (books && books.length > 0) {
      books.forEach(book => {
        if (book.first_publish_year) decades.add(Math.floor(book.first_publish_year / 10) * 10);
        if (book.publisher) book.publisher.forEach(p => publishers.add(p));
        if (book.subject) book.subject.slice(0, 5).forEach(g => genres.add(g));
        if (book.language) book.language.forEach(l => languages.add(l));
      });
    }
    return {
      availableDecades: Array.from(decades).sort((a, b) => a - b),
      availablePublishers: Array.from(publishers).sort(),
      availableGenres: Array.from(genres).sort(),
      availableLanguages: Array.from(languages).sort(),
    };
  }, [books]);

  const filteredBooks = React.useMemo(() => {
    return books.filter(book => {
      if (filters.decade !== 'all') {
        const bookDecade = Math.floor(book.first_publish_year / 10) * 10;
        if (bookDecade !== parseInt(filters.decade)) return false;
      }
      if (filters.pageCount !== 'all') {
        const pages = book.number_of_pages_median;
        if (!pages) return false;
        const [min, max] = filters.pageCount.split('-').map(Number);
        if (max) { if (pages < min || pages > max) return false; } 
        else { if (pages < min) return false; }
      }
      if (filters.publisher) {
        if (!book.publisher || !book.publisher.includes(filters.publisher)) return false;
      }
      if (filters.genre && filters.genre !== 'all') {
        if (!book.subject || !book.subject.includes(filters.genre)) return false;
      }
      if (filters.language && filters.language !== 'all') {
        if (!book.language || !book.language.includes(filters.language)) return false;
      }
      return true;
    });
  }, [books, filters]);

   const sortedAndFilteredBooks = React.useMemo(() => {
    const sortableBooks = [...filteredBooks];
    if (sortBy === 'recent') {
      sortableBooks.sort((a, b) => (b.first_publish_year || 0) - (a.first_publish_year || 0));
    } else if (sortBy === 'popular') {
      sortableBooks.sort((a, b) => (b.edition_count || 0) - (a.edition_count || 0));
    }
    return sortableBooks;
  }, [filteredBooks, sortBy]);

  const chartData = React.useMemo(() => {
  const decadeCounts = {};

  sortedAndFilteredBooks.forEach(book => {
    if (book.first_publish_year) {
      const decade = Math.floor(book.first_publish_year / 10) * 10;
      decadeCounts[decade] = (decadeCounts[decade] || 0) + 1;
    }
  });

  const sortedDecades = Object.keys(decadeCounts).sort((a, b) => a - b);
  const data = sortedDecades.map(decade => decadeCounts[decade]);

  return {
    labels: sortedDecades.map(d => `${d}s`),
    data: data,
  };
}, [sortedAndFilteredBooks]);

  const booksToDisplay = showOnlyFavorites ? favorites : sortedAndFilteredBooks;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="min-h-screen bg-blue-50">
        <TopBar 
          favoriteCount={favorites.length}
          onFavoritesClick={handleFavoritesViewToggle}
          isFavoritesViewActive={showOnlyFavorites} 
          onStatsClick={handleStatsModalOpen}/>
        <header className="starry-bg flex justify-center items-center top-0 w-full z-40 pt-8 pb-20">
          <div className="text-center pt-20">
            <h2 className="mt-20 text-3xl font-bold text-white">
              Descubra sua nova história aqui!
            </h2>
            <h3 className="mt-4 font-light text-white/80">Encontre informações sobre os mais diversos livros do mundo em um lugar só.</h3>
            <div className="w-full max-w-2xl">
            <SearchBar 
              value={searchQuery} 
              onSearchChange={handleSearchChange}
              onSearchSubmit={handleSearchSubmit}
              loading={loading}
              history={history}
              onHistoryClick={handleHistoryClick}
            />
            </div>
          </div>
        </header>
        
        <Container maxWidth="xl" className="py-8">
          {error && <Alert severity="error" className="my-6">{error}</Alert>}
          {!loading && books.length > 0 && isOfflineMode && (
            <Alert severity="info" className="my-6">
              <strong>Modo offline:</strong> Tivemos problemas com o servidor, mas aqui estão alguns livros que você pode gostar! Realize uma nova pesquisa ou atualize a página para tentar reestabelecer o site.
            </Alert>
          )}

          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="h4" component="h2" sx={{ fontWeight: 'bold', color: '#0c0a1e' }}>
                Resultados
              </Typography>
              {debouncedQuery && !loading && (
                <Typography sx={{ ml: 2, color: 'text.secondary' }}>
                  para: <strong>"{debouncedQuery}"</strong>
                </Typography>
              )}
            </Box>

            <ToggleButtonGroup
              value={sortBy}
              exclusive
              size="small"
              sx={{ borderRadius: '5px', bgcolor: 'lightgray', color: '#0c0a1e'}}
              
              onChange={(event, newSortBy) => {
                if (newSortBy !== null) {
                  setSortBy(newSortBy);
                }
              }
            }
              aria-label="ordenar por"
            >
              <ToggleButton value="popular" aria-label="ordenar por populares" sx={{ color: 'black', bgcolor: 'white' }}>
                Populares
              </ToggleButton>
              <ToggleButton value="recent" aria-label="ordenar por recentes" sx={{ color: 'black', bgcolor: 'white' }}>
                Recentes
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>

          <Box sx={{ my: 4 }}>
            <Button
              variant="outlined"
              startIcon={<FilterListIcon />}
              onClick={() => setIsFilterPanelOpen(prev => !prev)}
            >
              {isFilterPanelOpen ? 'Ocultar Filtros' : 'Filtrar por'}
            </Button>
          </Box>

          {isFilterPanelOpen && (
              <FilterPanel
                filters={filters}
                onFilterChange={handleFilterChange}
                availableDecades={availableDecades}
                availablePublishers={availablePublishers}
                availableGenres={availableGenres}
                availableLanguages={availableLanguages} />
          )}
          <Box className="min-h-[60vh]">
            {loading ? (
              <BookSkeleton count={10} />
            ) : filteredBooks.length > 0 ? (
              <>
                <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-8">
                  {booksToDisplay.map((book) => (
                    <BookCard
                      key={book.key}
                      book={book}
                      onBookClick={handleBookClick}
                      isFavorite={isFavorite(book.key)}
                      onToggleFavorite={toggleFavorite}
                    />
                  ))}
                </div>
                <Pagination
                  pagination={pagination}
                  onPageChange={handlePageChange}
                />
              </>
            ) : (
              <Box className="text-center py-16">
                <Typography variant="h5" className="text-gray-500 mb-4">
                  {books.length > 0 ? 'Nenhum livro corresponde aos filtros' : 'Nenhum livro encontrado'}
                </Typography>
                <Typography variant="body1" className="text-gray-400">
                  {books.length > 0 ? 'Tente remover ou alterar alguns filtros.' : 'Tente ajustar sua busca ou aguarde a API ficar disponível.'}
                </Typography>
              </Box>
            )}
          </Box>
        </Container>
        
        <BookModal book={selectedBook} open={isModalOpen} onClose={handleCloseModal} />
        <ScrollToTopButton />
        
        <StatsModal 
          open={isStatsModalOpen} 
          onClose={handleStatsModalClose} 
          data={chartData} 
          />
      </div>
    </ThemeProvider>
  );
}

export default App;