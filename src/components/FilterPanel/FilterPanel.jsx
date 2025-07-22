// src/components/FilterPanel/FilterPanel.jsx

import React from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem, Autocomplete, TextField } from '@mui/material';
import { getLanguageName, languageMap } from '../../utils/helpers';

const pageCountRanges = [
  { value: 'all', label: 'Todos' },
  { value: '0-200', label: '0 - 200 páginas' },
  { value: '201-400', label: '201 - 400 páginas' },
  { value: '401-600', label: '401 - 600 páginas' },
  { value: '601+', label: 'Mais de 600 páginas' },
];

const FilterPanel = ({ filters, onFilterChange, availablePublishers = [], availableDecades = [], availableGenres = [], availableLanguages = [] }) => {

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    onFilterChange(name, value);
  };

  const handleAutocompleteChange = (event, newValue) => {
    onFilterChange('publisher', newValue);
  };

  return (
    <Box 
      component="div" 
      className="flex flex-col md:flex-row gap-4 mb-8 p-4 bg-white rounded-lg shadow-sm"
    >
      {/* Filtro por Década */}
      <FormControl fullWidth>
        <InputLabel id="decade-filter-label">Década</InputLabel>
        <Select
          labelId="decade-filter-label"
          name="decade"
          value={filters.decade}
          label="Década"
          onChange={handleInputChange}
        >
          <MenuItem value="all">Todas</MenuItem>
          {availableDecades.map(decade => (
            <MenuItem key={decade} value={decade}>{`${decade}s`}</MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Filtro por Número de Páginas */}
      <FormControl fullWidth>
        <InputLabel id="page-count-filter-label">Nº de Páginas</InputLabel>
        <Select
          labelId="page-count-filter-label"
          name="pageCount"
          value={filters.pageCount}
          label="Nº de Páginas"
          onChange={handleInputChange}
        >
          {pageCountRanges.map(range => (
            <MenuItem key={range.value} value={range.value}>{range.label}</MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Filtro por Editora */}
      <Autocomplete
        fullWidth
        options={availablePublishers}
        value={filters.publisher}
        onChange={handleAutocompleteChange}
        renderInput={(params) => <TextField {...params} label="Editora" />}
        getOptionLabel={(option) => option || ""}
        isOptionEqualToValue={(option, value) => option === value}
      />

        {/* Filtro por Gênero */}
        <FormControl fullWidth>
            <InputLabel id="genre-filter-label">Gênero</InputLabel>
            <Select
                labelId="genre-filter-label"
                name="genre"
                value={filters.genre}
                label="Gênero"
                onChange={handleInputChange}
            >
                <MenuItem value="all">Todos</MenuItem>
                {availableGenres.map(genre => (
                    <MenuItem key={genre} value={genre}>{genre}</MenuItem>
                ))}
            </Select>
        </FormControl>

 {/* Filtro por Língua ATUALIZADO */}
      <Autocomplete
        fullWidth
        // O `map` agora cria um array com os nomes completos: ['Espanhol', 'Inglês', 'Português']
        options={availableLanguages.map(code => getLanguageName(code))}
        value={filters.language ? getLanguageName(filters.language) : null}
        onChange={(event, newValue) => {
          // Quando o usuário seleciona um nome (ex: "Português"),
          // encontramos o código original ("por") para salvar no estado do filtro.
          const originalCode = Object.keys(languageMap).find(key => languageMap[key] === newValue);
          onFilterChange('language', originalCode || null);
        }}
        renderInput={(params) => <TextField {...params} label="Língua" />}
      />
    </Box>
  );
};

export default FilterPanel;