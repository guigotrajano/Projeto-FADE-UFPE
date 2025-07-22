// src/components/StatsModal/StatsModal.jsx

import React from 'react';
import { Modal, Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DecadeChart from '../DecadeChart/DecadeChart';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  maxWidth: '800px',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const StatsModal = ({ open, onClose, data }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
        
        {data && data.labels.length > 0 ? (
          <DecadeChart chartData={data} />
        ) : (
          <Typography variant="h6" component="h2" align="center">
            Não há dados suficientes para gerar o gráfico.
          </Typography>
        )}
      </Box>
    </Modal>
  );
};

export default StatsModal;