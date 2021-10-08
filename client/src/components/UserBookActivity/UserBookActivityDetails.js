import React from 'react';
import { Table, Button, Nav } from 'react-bootstrap';
import './UserBookActivityDetails.css';

const UserBookActivityDetails = (props) => {
  const { activity, returnBook } = props;

  return (
    <Table striped bordered hover id="activity-table">
      <thead>
        <tr>
          <th>No</th>
          <th>Book Title</th>
          <th>Borrowed</th>
          <th>Returned</th>
        </tr>
      </thead>
      <tbody>
        {activity
          .map((a, index) => {
            return (
              <tr key={a.id}>
                <td id="td-activity">{index + 1}</td>
                <td id="td-activity">
                  <Nav.Link href={`/books/${a.bookId}`}>{a.name}</Nav.Link>
                </td>
                <td id="td-activity">{a.borrowed}</td>
                <td id="td-activity">
                  {a.returned ? (
                    a.returned
                  ) : (
                    <Button
                      variant="primary"
                      onClick={() => returnBook(a.bookId)}
                    >
                      RETURN
                    </Button>
                  )}
                </td>
              </tr>
            );
          })
          .reverse()}
      </tbody>
    </Table>
  );
};

export default UserBookActivityDetails;
