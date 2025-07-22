import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Chip,
  Divider,
  Grid
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { getCoverUrl, getPlaceholderUrl } from '../../services/openLibraryAPI';
import { 
  formatAuthors, 
  formatYear, 
  formatPages, 
  formatPublisher 
} from '../../utils/helpers';

/**
 * Modal para exibir detalhes do livro
 * @param {Object} book - Dados do livro
 * @param {boolean} open - Estado de abertura do modal
 * @param {Function} onClose - Função chamada ao fechar o modal
 * @returns {JSX.Element} Modal de detalhes
 */
const BookModal = ({ book, open, onClose }) => {
  if (!book) return null;

  const {
    title,
    author_name,
    first_publish_year,
    cover_i,
    number_of_pages_median,
    publisher,
    edition_count,
    key
  } = book;

  // Gera URL da capa ou placeholder
  const coverUrl = cover_i 
    ? getCoverUrl(cover_i, 'L') 
    : getPlaceholderUrl(title);

  // Formata dados para exibição
  const formattedTitle = title || 'Título não disponível';
  const formattedAuthors = formatAuthors(author_name);
  const formattedYear = formatYear(first_publish_year);
  const formattedPages = formatPages(number_of_pages_median);
  const formattedPublisher = formatPublisher(publisher);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      className="book-modal"
    >
      <DialogTitle className="flex justify-between items-center">
        <Typography variant="h5" component="h2" className="font-bold">
          Detalhes do Livro
        </Typography>
        <Button
          onClick={onClose}
          startIcon={<CloseIcon />}
          variant="outlined"
          size="small"
        >
          Fechar
        </Button>
      </DialogTitle>

      <DialogContent>
        <Grid container spacing={3}>
          {/* Imagem da capa */}
          <Grid item xs={12} md={4}>
            <Box className="flex justify-center">
              <img
                src={coverUrl}
                alt={formattedTitle}
                className="w-full max-w-xs h-auto rounded-lg shadow-md"
                onError={(e) => {
                  e.target.src = getPlaceholderUrl(formattedTitle);
                }}
              />
            </Box>
          </Grid>

          {/* Informações do livro */}
          <Grid item xs={12} md={8}>
            <Box className="space-y-4">
              {/* Título */}
              <Typography variant="h4" component="h1" className="font-bold">
                {formattedTitle}
              </Typography>

              {/* Autores */}
              <Box>
                <Typography variant="h6" color="text.secondary" className="mb-1">
                  Autor(es):
                </Typography>
                <Typography variant="body1">
                  {formattedAuthors}
                </Typography>
              </Box>

              <Divider />

              {/* Informações básicas */}
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Ano de Publicação:
                  </Typography>
                  <Typography variant="body1">
                    {formattedYear}
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Páginas:
                  </Typography>
                  <Typography variant="body1">
                    {formattedPages}
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Editora:
                  </Typography>
                  <Typography variant="body1">
                    {formattedPublisher}
                  </Typography>
                </Grid>
              </Grid>

              {/* Chips informativos */}
              <Box className="flex gap-2 flex-wrap">
                {edition_count > 1 && (
                  <Chip
                    label={`${edition_count} edições`}
                    color="primary"
                    variant="outlined"
                  />
                )}
                
                {key && (
                  <Chip
                    label={`ID: ${key.split('/').pop()}`}
                    variant="outlined"
                    size="small"
                  />
                )}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions className="p-4">
        <Button onClick={onClose} variant="contained" color="primary">
          Fechar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BookModal; 