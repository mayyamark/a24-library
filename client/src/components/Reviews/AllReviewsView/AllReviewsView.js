import React from 'react';
import SingleReviewDetails from '../SingleReviewDetails/SingleReviewDetails';
import './AllReviewsView.css';

const AllReviewsView = (props) => {
  const { reviews, editReview, hideReview, sendVote } = props;

  return (
    <div id="all-reviews-container">
      {reviews.map(review => {
        return <SingleReviewDetails 
                  key={review.reviewId} 
                  review={review}
                  editReview={editReview}
                  hideReview={hideReview}
                  sendVote={sendVote}
                />; 
      })}
    </div>
  );
};
export default AllReviewsView;
