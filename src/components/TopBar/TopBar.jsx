// src/components/TopBar/TopBar.jsx

import React from 'react';
import { AppBar, Toolbar, Typography, Box, IconButton, Badge, Tooltip } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import InfoIcon from '@mui/icons-material/Info';
import BarChartIcon from '@mui/icons-material/BarChart';

const TopBar = ({ favoriteCount, onFavoritesClick, isFavoritesViewActive, onStatsClick }) => {
  return (
    <AppBar position="static" sx={{ bgcolor: '#0c0a1e', color: 'white' }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold', fontSize: '2rem', fontFamily: 'sans-serif' }}>
          e-books
        </Typography>
        <Box>

          <Tooltip title="Estatísticas da Busca">
            <IconButton color="inherit" onClick={onStatsClick}>
              <BarChartIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Meus Favoritos">
            <IconButton 
              color="inherit" 
              onClick={onFavoritesClick}
              sx={{ color: isFavoritesViewActive ? '#1976d2' : 'inherit' }}
            >
              <Badge badgeContent={favoriteCount} color="primary">
                <FavoriteIcon />
              </Badge>
            </IconButton>
          </Tooltip>

          <Tooltip title="Sobre o Projeto">
            <IconButton color="inherit">
              <InfoIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;