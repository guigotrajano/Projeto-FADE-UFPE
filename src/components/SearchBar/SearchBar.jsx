import React from 'react';
import { TextField, InputAdornment, IconButton, Paper } from '@mui/material';
import { Search as SearchIcon, Clear as ClearIcon } from '@mui/icons-material';

/**
 * Componente de barra de pesquisa
 * @param {Function} onSearchChange - Função chamada ao mudar o valor
 * @param {string} value - Valor atual do campo
 * @param {boolean} loading - Estado de carregamento
 * @returns {JSX.Element} Barra de pesquisa
 */
const SearchBar = ({ onSearchChange, value = '', loading = false }) => {

  const handleClear = () => {
    onSearchChange('');
  };

  const handleChange = (event) => {
    onSearchChange(event.target.value);
  };

  return (
    <Paper className="w-full max-w-lg mx-auto my-8">
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Pesquise por título, autor ou termo geral..."
        value={value}
        onChange={handleChange}
        disabled={loading}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="action" />
            </InputAdornment>
          ),
          endAdornment: value && (
            <InputAdornment position="end">
              <IconButton
                onClick={handleClear}
                edge="end"
                size="small"
                disabled={loading}
              >
                <ClearIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
        className="w-full max-w-lg mx-auto my-8"
      />
      
      {value && (
        <div className="mt-2 text-sm text-gray-600">
          Pesquisando por: <strong>"{value}"</strong>
        </div>
      )}
    </Paper>
  );
};

export default SearchBar; 