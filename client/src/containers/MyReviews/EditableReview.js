import React, { useState } from 'react';
import { Card, Button, Image, Modal, InputGroup, Nav } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import BASE_URL from '../../common/base-url';

const EditableReview = (props) => {
  const { currentUser } = useAuth();
  const [show, setShow] = useState(false);
  const [updatedReview, setUpdatedReview] = useState();

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const handleSave = () => {
    const updateReview = () => {
      fetch(
        `${BASE_URL}/books/${props.review.bookId}/reviews/${props.review.id}`,
        {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${currentUser.token}`,
          },
          body: JSON.stringify({
            text: updatedReview,
          }),
        },
      )
        .then((res) => {
          if (res.ok) {
            props.update({ id: props.review.id, updateText: updatedReview });
          } else {
            return res
              .json()
              .then((beErrMsg) => Promise.reject(new Error(beErrMsg.message)));
          }
        })
        .catch((err) => alert(err.message));
    };
    updateReview();
    setShow(false);
  };

  const deleteReview = async () => {
    fetch(
      `${BASE_URL}/books/${props.review.bookId}/reviews/${props.review.id}`,
      {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${currentUser.token}`,
        },
        body: null,
      },
    )
      .then((res) => {
        if (res.ok) {
          props.update({ id: props.review.id, deleted: true });
        } else {
          return res
            .json()
            .then((beErrMsg) => Promise.reject(new Error(beErrMsg.message)));
        }
      })
      .catch((err) => alert(err.message));
  };

  return (
    <div>
      <Card id="single-review-card" className="text-center">
        <Card.Body>
          <Card.Title>
            <Nav.Link href={`/books/${props.review.bookId}`}>
              <Image
                height="100"
                width="100"
                src={props.review.bookImage}
                thumbnail
              />
              {props.review.bookName}
            </Nav.Link>
          </Card.Title>
          <hr />
          <Card.Text>{props.review.text}</Card.Text>
        </Card.Body>
        <Card.Footer>
          <Button
            variant="outline-primary"
            className="text-center mt-1"
            onClick={handleShow}
          >
            Edit
          </Button>
          {'   '}
          <Button
            variant="outline-danger"
            className="text-center mt-1"
            onClick={deleteReview}
          >
            Delete
          </Button>
        </Card.Footer>
      </Card>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup>
            <textarea
              className="form-control"
              aria-label="With textarea"
              onChange={(event) => setUpdatedReview(event.target.value)}
            >
              {props.review.text}
            </textarea>
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default EditableReview;
