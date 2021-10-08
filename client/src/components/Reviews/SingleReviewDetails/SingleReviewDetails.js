import React, { useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import ReviewOptionsButtons from './ReviewOptionsButtons/ReviewOptionsButtons';
import './SingleReviewDetails.css';
import { Button, Modal, Form, InputGroup, Badge } from 'react-bootstrap';

const SingleReviewDetails = (props) => {
  const { review, editReview, hideReview, sendVote } = props;
  const { currentUser } = useAuth();
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const [text, setText] = useState(review.text);
  const [isDeleted, setIsDeleted] = useState('');

  const updateData = { text };
  if (isDeleted === 0) {
    updateData.isDeleted = isDeleted;
  }

  return (
    <>
      {show && (
        <Modal show={show} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Edit review</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <InputGroup>
              <textarea
                className="form-control"
                aria-label="With textarea"
                value={text}
                onChange={(ev) => setText(ev.target.value)}
              >
                {review.text}
              </textarea>
            </InputGroup>
            {currentUser.role === 'Admin' && review.isDeleted === 1 && (
              <InputGroup className="checkboxes-and-radios">
                <Form.Check
                  id="radio-1"
                  type="radio"
                  label="Show review to the world"
                  onChange={() => setIsDeleted(0)}
                />
              </InputGroup>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => editReview(review.reviewId, updateData)}
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      <div
        className={`review-container ${
          review.isDeleted === 1 && 'deleted-review'
        }`}
      >
        <div className="review-info">
          {(currentUser.role === 'Admin' && (
            <ReviewOptionsButtons
              showEditReview={handleShow}
              hideReview={hideReview}
              review={review}
            />
          )) ||
            (currentUser.username === review.user && (
              <ReviewOptionsButtons
                showEditReview={handleShow}
                hideReview={hideReview}
                review={review}
              />
            ))}
          <h2>{review.text}</h2>
          <p>
            by <i>{review.user}</i>
          </p>
          {review.isDeleted === 1 && <Badge variant="secondary">deleted</Badge>}
          <div className="votes">
            <i
              className="fa fa-thumbs-up"
              aria-hidden="true"
              onClick={(ev) =>
                sendVote(review.bookId, review.reviewId, { vote: 'like' })
              }
            >
              {review.likes}
            </i>
            <i
              className="fa fa-thumbs-down"
              aria-hidden="true"
              onClick={(ev) =>
                sendVote(review.bookId, review.reviewId, { vote: 'dislike' })
              }
            >
              {review.dislikes}
            </i>
          </div>
        </div>
        <hr />
      </div>
    </>
  );
};

export default SingleReviewDetails;
