import React, { useState } from 'react';
import swal from 'sweetalert';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import { useBook } from '../../contexts/BookContext';
import BASE_URL from '../../common/base-url';
import Loader from '../../components/Loader/Loader';
import CreateReview from '../../components/Reviews/CreateReview/CreateReview';
import AllReviewsView from '../../components/Reviews/AllReviewsView/AllReviewsView';
import Home from '../../components/Home/Home';

const Reviews = (props) => {
  const { book, reviews, setReviews } = useBook();
  const { currentUser } = useAuth();

  const fetchUrl =
    currentUser.role === 'Admin' ? `${BASE_URL}/admin` : BASE_URL;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [warn, setWarn] = useState(props.warn);

  const [isCreatingReview, setIsCreatingReview] = useState(false);

  const hideCreateReview = () => {
    setIsCreatingReview(false);
  };

  const sendReviewHandler = (newReviewData) => {
    setLoading(true);
    setWarn(null);

    fetch(`${fetchUrl}/books/${book.bookId}/reviews`, {
      method: 'POST',
      headers: new Headers({
        Authorization: `Bearer ${currentUser.token}`,
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(newReviewData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          throw new Error(data.message);
        } else {
          const reviewsCopy = [...reviews, data.review];
          setReviews(reviewsCopy);
        }
      })
      .catch((err) => {
        swal({
          title: 'Attention!',
          text: 'An error has occurred!',
          icon: 'error',
          button: 'OK :(',
        });

        setError(err.message);
      })
      .finally(() => setLoading(false));
  };

  const hideReviewHandler = (reviewId) => {
    setLoading(true);
    setWarn(null);

    fetch(`${fetchUrl}/books/${book.bookId}/reviews/${reviewId}`, {
      method: 'DELETE',
      mode: 'cors',
      headers: new Headers({
        Authorization: `Bearer ${currentUser.token}`,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        const index = reviews.findIndex((r) => r.reviewId === reviewId);
        const copy = [...reviews];

        if (copy[index].isDeleted === 0) {
          copy[index].isDeleted = 1;
        } else {
          copy.splice(index, 1);
        }

        setReviews(copy);

        swal({
          title: 'Success!',
          text: `You hid review with id ${reviewId}!`,
          icon: 'success',
          button: 'Nice!',
        });
      })
      .catch((err) => {
        swal({
          title: 'Attention!',
          text: 'An error has occurred!',
          icon: 'error',
          button: 'OK :(',
        });

        setError(err.message);
      })
      .finally(() => setLoading(false));
  };

  const editReviewHandler = (reviewId, updateReviewData) => {
    setLoading(true);
    setWarn(null);

    fetch(`${fetchUrl}/books/${book.bookId}/reviews/${reviewId}`, {
      method: 'PUT',
      headers: new Headers({
        Authorization: `Bearer ${currentUser.token}`,
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(updateReviewData),
    })
      .then((res) => res.json())
      .then((data) => {
        const index = reviews.findIndex((r) => r.reviewId === reviewId);
        const reviewsCopy = [...reviews];

        if (updateReviewData.text) {
          reviewsCopy[index].text = data.text;
        }
        if (updateReviewData.isDeleted === 0) {
          reviewsCopy[index].isDeleted = 0;
        }
        setReviews(reviewsCopy);

        swal({
          title: 'Success!',
          text: 'The review was saved!',
          icon: 'success',
          button: 'Nice!',
        });
      })
      .catch((err) => {
        swal({
          title: 'Attention!',
          text: 'An error has occurred!',
          icon: 'error',
          button: 'OK :(',
        });

        setError(err.message);
      })
      .finally(() => setLoading(false));
  };

  const sendVoteHandler = (bookId, reviewId, newVoteData) => {
    setLoading(true);
    setWarn(null);

    fetch(`${BASE_URL}/books/${bookId}/reviews/${reviewId}/votes`, {
      method: 'PUT',
      headers: new Headers({
        Authorization: `Bearer ${currentUser.token}`,
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(newVoteData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          throw new Error(data.message);
        } else if (data.warningMessage) {
          setWarn(data.warningMessage);
        } else {
          const index = reviews.findIndex((r) => r.reviewId === reviewId);
          const copy = [...reviews];
          copy[index].likes = data.votes.likes;
          copy[index].dislikes = data.votes.dislikes;
          setReviews(copy);

          swal({
            title: 'Success!',
            text: `Your ${newVoteData.vote} was calculated!`,
            icon: 'success',
            button: 'Nice!',
          });
        }
      })
      .catch((err) => {
        swal({
          title: 'Attention!',
          text: 'An error has occurred!',
          icon: 'error',
          button: 'OK :(',
        });

        setError(err.message);
      })
      .finally(() => setLoading(false));
  };

  if (error) {
    return <Home />;
  }

  if (loading) {
    return <Loader />;
  }

  if (warn) {
    swal({
      title: 'Just to inform you:',
      text: `${warn}`,
      icon: 'info',
      button: 'OK!',
    });
  }

  return (
    <>
      {isCreatingReview ? (
        <CreateReview
          sendReview={sendReviewHandler}
          hideCreateReview={hideCreateReview}
        />
      ) : (
        !reviews.find((r) => r.user === currentUser.username) && (
          <Button
            variant="outline-primary"
            className="create-review-btn"
            onClick={() => setIsCreatingReview(true)}
          >
            <i className="fa fa-plus review-plus" aria-hidden="true"></i>
            &nbsp;Add review
          </Button>
        )
      )}
      <AllReviewsView
        reviews={reviews}
        editReview={editReviewHandler}
        hideReview={hideReviewHandler}
        sendVote={sendVoteHandler}
      />
    </>
  );
};

export default Reviews;
