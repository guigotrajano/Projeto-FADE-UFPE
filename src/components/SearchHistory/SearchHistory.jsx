// src/components/SearchHistory/SearchHistory.jsx

import React from 'react';
import { List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';
import HistoryIcon from '@mui/icons-material/History';

const SearchHistory = ({ history, onHistoryClick }) => {
  if (!history || history.length === 0) return null;

  return (
    <List dense>
      <Typography 
        variant="caption" 
        sx={{ pl: 2, color: 'text.secondary', textTransform: 'uppercase', fontWeight: 'bold' }}
      >
        Pesquisas Recentes
      </Typography>
      {history.map((term) => (
        <ListItem key={term} disablePadding>
          <ListItemButton onClick={() => onHistoryClick(term)}>
            <HistoryIcon sx={{ mr: 1.5, color: 'text.secondary', fontSize: 20 }} />
            <ListItemText primary={term} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default SearchHistory;