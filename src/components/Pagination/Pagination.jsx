import React from 'react';
import { 
  Pagination as MuiPagination, 
  PaginationItem, 
  Box, 
  Typography,
  Button,
  ButtonGroup
} from '@mui/material';
import { 
  FirstPage, 
  LastPage, 
  NavigateBefore, 
  NavigateNext 
} from '@mui/icons-material';
import { calculateTotalPages } from '../../utils/helpers';

/**
 * Componente de paginação customizado
 * @param {Object} pagination - Dados da paginação
 * @param {Function} onPageChange - Função chamada ao mudar página
 * @param {string} currentQuery - Query atual para manter na navegação
 * @returns {JSX.Element} Componente de paginação
 */
const Pagination = ({ pagination, onPageChange, currentQuery = '*' }) => {
  const { page, totalResults, limit } = pagination;
  const totalPages = calculateTotalPages(totalResults, limit);

  // Se não há resultados ou apenas uma página, não mostra paginação
  if (totalResults === 0 || totalPages <= 1) {
    return null;
  }

  const handlePageChange = (event, newPage) => {
    if (onPageChange && newPage !== page) {
      onPageChange(newPage, currentQuery);
    }
  };

  const handleFirstPage = () => {
    if (onPageChange && page > 1) {
      onPageChange(1, currentQuery);
    }
  };

  const handleLastPage = () => {
    if (onPageChange && page < totalPages) {
      onPageChange(totalPages, currentQuery);
    }
  };

  const handlePrevPage = () => {
    if (onPageChange && page > 1) {
      onPageChange(page - 1, currentQuery);
    }
  };

  const handleNextPage = () => {
    if (onPageChange && page < totalPages) {
      onPageChange(page + 1, currentQuery);
    }
  };

  return (
    <Box className="flex flex-col items-center gap-4 py-6">
      {/* Informações da página */}
      <Typography variant="body2" color="text.secondary">
        Página {page} de {totalPages} • {totalResults.toLocaleString()} resultados
      </Typography>

      {/* Botões de navegação */}
      <ButtonGroup variant="outlined" size="small">
        <Button
          onClick={handleFirstPage}
          disabled={page <= 1}
          startIcon={<FirstPage />}
        >
          Primeira
        </Button>
        
        <Button
          onClick={handlePrevPage}
          disabled={page <= 1}
          startIcon={<NavigateBefore />}
        >
          Anterior
        </Button>
        
        <Button
          onClick={handleNextPage}
          disabled={page >= totalPages}
          endIcon={<NavigateNext />}
        >
          Próxima
        </Button>
        
        <Button
          onClick={handleLastPage}
          disabled={page >= totalPages}
          endIcon={<LastPage />}
        >
          Última
        </Button>
      </ButtonGroup>

      {/* Paginação numérica */}
      <MuiPagination
        count={totalPages}
        page={page}
        onChange={handlePageChange}
        color="primary"
        size="large"
        showFirstButton
        showLastButton
        renderItem={(item) => (
          <PaginationItem
            {...item}
            className={item.page === page ? 'bg-blue-500 text-white' : ''}
          />
        )}
      />
    </Box>
  );
};

export default Pagination; 