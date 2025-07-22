import React from 'react';
import { Fab, Zoom, useScrollTrigger } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const ScrollToTopButton = () => {
  const trigger = useScrollTrigger({
    disableHysteresis: true, 
    threshold: 200, 
  });

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <Zoom in={trigger}>
      <Fab
        color="primary"
        size="small"
        onClick={handleClick}
        aria-label="voltar para o topo"
        sx={{ position: 'fixed', bottom: 24, right: 24, zIndex: 100 }}
      >
        <KeyboardArrowUpIcon />
      </Fab>
    </Zoom>
  );
};

export default ScrollToTopButton;