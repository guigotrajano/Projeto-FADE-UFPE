import React, { useState } from 'react';
import { TextField, InputAdornment, IconButton, Paper, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import SearchHistory from '../SearchHistory/SearchHistory';

const SearchBar = ({ onSearchChange, onSearchSubmit, value = '', loading = false, history, onHistoryClick }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleClear = () => onSearchChange('');
  const handleChange = (event) => onSearchChange(event.target.value);
  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && value.trim() !== '') {
      onSearchSubmit(value.trim());

      event.target.blur();
    }
  };

  return (
    <Paper 
      elevation={isFocused ? 4 : 1} 
      sx={{ 
        position: 'relative', 
        transition: 'box-shadow 0.3s',
        mt: 5
      }}
    >
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Pesquise por título, autor ou termo geral..."
        value={value}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setTimeout(() => setIsFocused(false), 200)}
        disabled={loading}
        InputProps={{
          sx: { backgroundColor: 'white' },
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="action" />
            </InputAdornment>
          ),
          endAdornment: value && (
            <InputAdornment position="end">
              <IconButton onClick={handleClear} edge="end" size="small" disabled={loading}>
                <ClearIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      {isFocused && history.length > 0 && (
        <Box 
          sx={{ 
            position: 'absolute', 
            top: '110%', 
            left: 0, 
            right: 0, 
            zIndex: 10,
            bgcolor: ['white'],
            borderRadius: '8px',
            boxShadow: 3,
            overflow: 'hidden'
          }}
        >
          <SearchHistory history={history} onHistoryClick={onHistoryClick} />
        </Box>
      )}
    </Paper>
  );
};

export default SearchBar;