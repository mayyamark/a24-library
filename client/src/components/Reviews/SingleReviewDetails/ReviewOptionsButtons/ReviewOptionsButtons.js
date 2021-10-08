import React from 'react';
import { Dropdown } from 'react-bootstrap';
import './ReviewOptionsButtons.css';

const ReviewOptionsButtons = (props) => {
  const { review, hideReview, showEditReview } = props;

  return (
    <>
      <Dropdown id="review-dropdown">
        <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic">
          <i className="fa fa-cog fa-fw review-options" aria-hidden="true"></i>
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={() => showEditReview()}>
            <i className="fa fa-pencil review-options" aria-hidden="true"></i>
            &nbsp;&nbsp;Edit
          </Dropdown.Item>
          {review.isDeleted === 0 && (
            <Dropdown.Item onClick={() => hideReview(review.reviewId)}>
              <i className="fa fa-trash admin-options" aria-hidden="true"></i>
              &nbsp;&nbsp;Delete
            </Dropdown.Item>
          )}
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

export default ReviewOptionsButtons;
