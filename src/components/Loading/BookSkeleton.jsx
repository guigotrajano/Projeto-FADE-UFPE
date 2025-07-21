import React from 'react';
import { Skeleton, Card, CardContent } from '@mui/material';

/**
 * Componente de skeleton loading para cards de livros
 * @param {number} count - Número de skeletons a exibir
 * @returns {JSX.Element} Array de skeletons
 */
const BookSkeleton = ({ count = 12 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {Array.from({ length: count }).map((_, index) => (
        <Card key={index} className="h-full flex flex-col">
          <Skeleton
            variant="rectangular"
            width="100%"
            height={200}
            className="rounded-t-lg"
          />
          <CardContent className="flex-1 flex flex-col">
            <Skeleton variant="text" width="80%" height={24} className="mb-2" />
            <Skeleton variant="text" width="60%" height={20} className="mb-2" />
            <Skeleton variant="text" width="40%" height={16} />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default BookSkeleton; 