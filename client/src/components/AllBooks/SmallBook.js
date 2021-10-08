import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Badge, Nav } from 'react-bootstrap';

const SmallBook = ({ book }) => {
  const { currentUser } = useAuth();

  return (
    <div className="small-book">
      <div className="small-book-image">
        <img src={book.image} alt={book.name} />
      </div>
      <div className="small-book-info">
        <h2>{book.name}</h2>
        <h4>{book.author}</h4>
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
        <p className={book.status}>
          status: <i>{book.status}</i>
        </p>

        <Nav activeKey="/home">
          <Nav.Link id="more-info" href={`/books/${book.bookId}`}>
            MORE INFO
          </Nav.Link>
        </Nav>
      </div>
      <hr />
    </div>
  );
};

export default SmallBook;
