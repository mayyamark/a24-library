import React, { useState } from 'react';
import { Button, Badge, ListGroup } from 'react-bootstrap';
import { useAuth } from '../../../contexts/AuthContext';
import AdminOptionsButtons from '../AdminOptionsButtons/AdminOptionsButtons';
import Rate from '../../../containers/Rate/Rate';
import Reviews from '../../../containers/Reviews/Reviews';
import UpdateBook from '../UpdateBook/UpdateBook';
import { useBook } from '../../../contexts/BookContext';
import './SingleBookDetails.css';
import '../AdminOptionsButtons/AdminOptionsButtons.css';

const SingleBookDetails = (props) => {
  const { warn, borrowBook, hideBook, sendUpdatedBook } = props;
  const { book } = useBook();
  const { currentUser } = useAuth();

  const [showDescription, setShowDescription] = useState(true);
  const [showReviews, setShowReviews] = useState(false);
  const [showRate, setShowRate] = useState(false);
  const [isUpdatingBook, setIsUpdatingBook] = useState(false);

  const hideEditBook = () => {
    setIsUpdatingBook(false);
  };

  const showEditBook = () => {
    setIsUpdatingBook(true);
  };

  const show = (showElement, hideElement1, hideElement2) => {
    showElement(true);
    hideElement1(false);
    hideElement2(false);
  };

  return (
    <>
      {currentUser.role === 'Admin' && isUpdatingBook && (
        <UpdateBook
          sendUpdatedBook={sendUpdatedBook}
          hideEditBook={hideEditBook}
        />
      )}
      <div className="single-book">
        <div className="single-book-image">
          <img src={book.image} alt={book.name} />
        </div>
        <div className="single-book-info">
          {currentUser.role === 'Admin' && (
            <AdminOptionsButtons
              hideBook={hideBook}
              showEditBook={showEditBook}
            />
          )}
          <div className="single-book-title">
            <p className="single-book-id">id: {book.bookId}</p>
            <h1>{book.name}</h1>
          </div>
          <div className="single-book-details">
            <h2>{book.author}</h2>
            <p>
              genre: <b>{book.genre}</b>
            </p>
            <p className={book.status}>
              status: <i>{book.status}</i>
            </p>
          </div>

          {currentUser.role === 'Admin' &&
            (book.isDeleted === 0 ? (
              <Badge variant="success" style={{ fontSize: '11pt' }}>
                visible for users
              </Badge>
            ) : (
              <Badge variant="danger" style={{ fontSize: '11pt' }}>
                hidden from users
              </Badge>
            ))}

          <div className="single-book-btn">
            {book.status === 'free' && (
              <Button variant="primary" size="lg" onClick={borrowBook}>
                BORROW
              </Button>
            )}
          </div>

          <ListGroup horizontal>
            <ListGroup.Item
              style={{ borderRadius: '0px' }}
              onClick={() =>
                show(setShowDescription, setShowReviews, setShowRate)
              }
            >
              Description
            </ListGroup.Item>
            <ListGroup.Item
              onClick={() =>
                show(setShowReviews, setShowDescription, setShowRate)
              }
            >
              Reviews
            </ListGroup.Item>
            <ListGroup.Item
              onClick={() =>
                show(setShowRate, setShowDescription, setShowReviews)
              }
            >
              Rate
            </ListGroup.Item>
          </ListGroup>

          <div className="single-book-description">
            <p>{showDescription && book.description}</p>
          </div>
          <div>{showReviews && <Reviews warn={warn} />}</div>
          <div>{showRate && <Rate />}</div>
        </div>
      </div>
    </>
  );
};

export default SingleBookDetails;
