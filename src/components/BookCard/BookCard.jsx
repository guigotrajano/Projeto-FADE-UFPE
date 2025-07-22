// src/components/BookCard/BookCard.jsx

import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box, IconButton, Tooltip } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { getCoverUrl, getPlaceholderUrl } from '../../services/openLibraryAPI';
import { formatAuthors, formatYear, truncateText } from '../../utils/helpers';
import Chip from '@mui/material/Chip';

// Adicionar as novas props: isFavorite e onToggleFavorite
const BookCard = ({ book, onBookClick, isFavorite, onToggleFavorite }) => {
  const { title, author_name, first_publish_year, cover_i, edition_count } = book;
  const coverUrl = cover_i ? getCoverUrl(cover_i, 'M') : getPlaceholderUrl(title);
  const formattedTitle = truncateText(title, 50);
  const formattedAuthors = formatAuthors(author_name);
  const formattedYear = formatYear(first_publish_year);
  const handleClick = () => { if (onBookClick) { onBookClick(book); } };

  const handleFavoriteClick = (event) => {
    event.stopPropagation(); // Impede que o modal do livro abra ao clicar no coração
    onToggleFavorite(book);
  };

  return (
    <Card 
      className="h-full flex flex-col cursor-pointer transition-transform duration-200 hover:scale-105 hover:shadow-lg"
      sx={{ position: 'relative' }} // Posição relativa para o botão de favorito
    >
      {/* Botão de Favorito posicionado no canto superior direito */}
      <Tooltip title={isFavorite ? "Remover dos Favoritos" : "Adicionar aos Favoritos"}>
        <IconButton
          aria-label="toggle favorite"
          onClick={handleFavoriteClick}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            color: isFavorite ? 'red' : 'white',
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
            },
          }}
        >
          {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
      </Tooltip>

      <div onClick={() => onBookClick(book)}> {/* Mover o onClick para um wrapper */}
        <CardMedia
          component="img"
          height="200"
          image={coverUrl}
          alt={title}
          className="object-cover"
        />
      <CardContent className="flex-1 flex flex-col">
        <Typography variant="h6" component="h3" className="font-semibold mb-2 line-clamp-2" title={title}>
          {formattedTitle}
        </Typography>
        <Typography variant="body2" color="text.secondary" className="mb-2 line-clamp-2" title={formattedAuthors}>
          {formattedAuthors}
        </Typography>
        <div className="flex justify-between items-center mt-auto">
          <Typography variant="caption" color="text.secondary">{formattedYear}</Typography>
          {edition_count > 1 && (<Chip label={`${edition_count} edições`} size="small" variant="outlined" className="text-xs" />)}
        </div>
      </CardContent>
      </div>
    </Card>
  );
};

export default React.memo(BookCard);