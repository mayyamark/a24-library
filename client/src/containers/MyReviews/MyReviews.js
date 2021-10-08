import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import BASE_URL from '../../common/base-url';
import EditableReview from './EditableReview';
import './MyReviews.css';

const MyReviews = () => {
  const { currentUser } = useAuth();
  const [reviews, setReviews] = useState();
  const [update, setUpdate] = useState();

  useEffect(() => {
    const fetchUsersReviews = () => {
      fetch(`${BASE_URL}/users/reviews`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${currentUser.token}`,
        },
        body: null,
      })
        .then((res) => {
          if (res.ok) {
            return res.json().then((body) => setReviews(body.reviews));
          } else if (res.status !== 404) {
            return res
              .json()
              .then((beErrMsg) => Promise.reject(new Error(beErrMsg.message)));
          }
          return Promise.resolve();
        })
        .catch((err) => alert(err.message));
    };

    if (currentUser) {
      fetchUsersReviews();
    }
  }, [currentUser, update]);

  return (
    <div id="my-reviews">
      {reviews &&
        reviews.map((review) => (
          <EditableReview
            key={review.id}
            id="my-reviews-single"
            update={setUpdate}
            review={review}
          />
        ))}
    </div>
  );
};

export default MyReviews;
