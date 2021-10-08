import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { useBook } from '../../../contexts/BookContext';
import './AdminOptionsButtons.css';

const AdminOptionsButtons = (props) => {
  const { hideBook, showEditBook } = props;
  const { book } = useBook();

  return (
    <>
      <Dropdown id="book-dropdown">
        <Dropdown.Toggle variant="outline-primary" id="dropdown-basic">
          <i className="fa fa-cog fa-fw admin-options" aria-hidden="true"></i>
          &nbsp;Options
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={showEditBook}>
            <i className="fa fa-pencil admin-options" aria-hidden="true"></i>
            &nbsp;&nbsp;Edit
          </Dropdown.Item>
          {book.isDeleted === 0 && (
            <Dropdown.Item onClick={hideBook}>
              <i className="fa fa-trash admin-options" aria-hidden="true"></i>
              &nbsp;&nbsp;Hide book
            </Dropdown.Item>
          )}
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

export default AdminOptionsButtons;
