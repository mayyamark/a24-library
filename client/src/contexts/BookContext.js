import React, { createContext } from 'react';

export const BookContext = createContext({
  book: {},
  reviews: [],
  setBook: () => {},
  setReviews: () => {},
});

export const useBook = () => React.useContext(BookContext);
