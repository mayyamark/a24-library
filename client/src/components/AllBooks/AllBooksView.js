import React from 'react';
import SmallBook from './SmallBook';
import './SmallBook.css';

const AllBooksView = (props) => {
  const { books } = props;

  return (
    <div id="all-books-container">
      {books.map((book) => (
        <SmallBook key={book.bookId} book={book} />
      ))}
    </div>
  );
};
export default AllBooksView;
