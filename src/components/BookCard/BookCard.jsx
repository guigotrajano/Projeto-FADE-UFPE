// src/components/BookCard/BookCard.jsx

import React from 'react'; // <-- Importe React
import { Card, CardContent, CardMedia, Typography, Chip } from '@mui/material';
import { getCoverUrl, getPlaceholderUrl } from '../../services/openLibraryAPI';
import { formatAuthors, formatYear, truncateText } from '../../utils/helpers';

const BookCard = ({ book, onBookClick }) => {
  // ...todo o seu código interno do card, que está ótimo...
  const { title, author_name, first_publish_year, cover_i, edition_count } = book;
  const coverUrl = cover_i ? getCoverUrl(cover_i, 'M') : getPlaceholderUrl(title);
  const formattedTitle = truncateText(title, 50);
  const formattedAuthors = formatAuthors(author_name);
  const formattedYear = formatYear(first_publish_year);
  const handleClick = () => { if (onBookClick) { onBookClick(book); } };

  return (
    <Card 
      className="h-full flex flex-col cursor-pointer transition-transform duration-200 hover:scale-105 hover:shadow-lg"
      onClick={handleClick}
    >
      <CardMedia
        component="img"
        height="200"
        image={coverUrl}
        alt={title}
        className="object-cover"
        onError={(e) => { e.target.src = getPlaceholderUrl(title); }}
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
    </Card>
  );
};

// Envolvemos o componente com React.memo para otimizar
export default React.memo(BookCard);