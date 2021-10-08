import React, { useState } from 'react';
import swal from 'sweetalert';
import { useAuth } from '../../contexts/AuthContext';
import BASE_URL from '../../common/base-url';
import Loader from '../../components/Loader/Loader';
import RateStars from '../../components/RateStars/RateStars';
import { useBook } from '../../contexts/BookContext';
import Home from '../../components/Home/Home';

const Rate = () => {
  const { currentUser } = useAuth();
  const { book, setBook } = useBook();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [warn, setWarn] = useState(null);

  const sendRateHandler = (newRateData) => {
    setLoading(true);
    setWarn(null);

    fetch(`${BASE_URL}/books/${book.bookId}/rate`, {
      method: 'POST',
      headers: new Headers({
        Authorization: `Bearer ${currentUser.token}`,
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(newRateData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          throw new Error(data.message);
        } else if (data.warningMessage) {
          setWarn(data.warningMessage);
        } else {
          swal({
            title: 'Success!',
            text: `You rated with ${newRateData.rate}!`,
            icon: 'success',
            button: 'Nice!',
          });

          const copy = { ...book, averageRate: data.averageRate };
          setBook(copy);
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
    <div className="rate-container">
      <RateStars sendRate={sendRateHandler} />
      {<div className="average-rate-container">&nbsp;{book.averageRate}</div>}
    </div>
  );
};
export default Rate;
