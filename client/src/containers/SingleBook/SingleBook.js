import React, { useState, useEffect } from 'react';
import swal from 'sweetalert';
import { useAuth } from '../../contexts/AuthContext';
import { BookContext } from '../../contexts/BookContext';
import BASE_URL from '../../common/base-url';
import Loader from '../../components/Loader/Loader';
import SingleBookDetails from '../../components/SingleBook/SingleBookDetails/SingleBookDetails';
import Home from '../../components/Home/Home';

const SingleBook = (props) => {
  const { id } = props.match.params;
  const { currentUser } = useAuth();

  const getUrl = currentUser.role === 'Admin' ? `${BASE_URL}/admin` : BASE_URL;

  const [book, setBook] = useState([]);
  const [reviews, setReviews] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [warn, setWarn] = useState(null);

  useEffect(() => {
    setLoading(true);

    Promise.allSettled([
      fetch(`${getUrl}/books/${id}`, {
        method: 'GET',
        headers: new Headers({
          Authorization: `Bearer ${currentUser.token}`,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.message) {
            throw new Error(data.message);
          } else {
            setBook(data);
          }
        }),

      fetch(`${getUrl}/books/${id}/reviews`, {
        method: 'GET',
        headers: new Headers({
          Authorization: `Bearer ${currentUser.token}`,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.message) {
            throw new Error(data.message);
          } else if (data.warningMessage) {
            setWarn(data.warningMessage);
          } else {
            setReviews(data.reviews);
          }
        }),
    ])
      .catch((err) => {
        swal({
          title: 'You have no permission!',
          text: 'Probably you have been banned!',
          icon: 'error',
          button: 'OK :(',
        });

        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, [getUrl, id, currentUser]);

  const borrowBookHandler = (id) => {
    fetch(`${BASE_URL}/books/${id}`, {
      method: 'PUT',
      headers: new Headers({
        Authorization: `Bearer ${currentUser.token}`,
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({ status_id: 2 }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          throw new Error(data.message);
        } else {
          setBook(data.book);
          swal({
            title: 'Success!',
            text: `${data.successMessage}`,
            icon: 'success',
            button: 'Nice!',
          });
        }
      })
      .catch((err) => {
        swal({
          title: 'You have no permission!',
          text: 'Probably you have been banned!',
          icon: 'error',
          button: 'OK :(',
        });

        setError(err.message);
      })
      .finally(() => setLoading(false));
  };

  const hideBookHandler = () => {
    setLoading(true);

    fetch(`${BASE_URL}/admin/books/${id}`, {
      method: 'DELETE',
      mode: 'cors',
      headers: new Headers({
        Authorization: `Bearer ${currentUser.token}`,
      }),
    })
      .then((responce) => responce.json())
      .then((data) => {
        if (data.message) {
          throw new Error(data.message);
        } else {
          const copy = { ...book };
          copy.isDeleted = 1;
          setBook(copy);
        }
      })
      .catch((err) => {
        swal({
          title: 'You have no permission!',
          text: 'Probably you have been banned!',
          icon: 'error',
          button: 'OK :(',
        });
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);

        swal({
          title: 'Success!',
          text: `You hid book with id ${id}!`,
          icon: 'success',
          button: 'Nice!',
        });
      });
  };

  const sendUpdatedBookHandler = (id, updateData) => {
    fetch(`${BASE_URL}/admin/books/${id}`, {
      method: 'PUT',
      headers: new Headers({
        Authorization: `Bearer ${currentUser.token}`,
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(updateData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          throw new Error(data.message);
        } else {
          setBook({ ...book, ...data.book });
          swal({
            title: 'Success!',
            text: `${data.successMessage}`,
            icon: 'success',
            button: 'Nice!',
          });
        }
      })
      .catch((err) => {
        swal({
          title: 'You have no permission!',
          text: 'Probably you have been banned!',
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

  return (
    <BookContext.Provider
      value={{
        book: book,
        reviews: reviews,
        setBook: setBook,
        setReviews: setReviews,
      }}
    >
      <SingleBookDetails
        warn={warn}
        borrowBook={() => borrowBookHandler(id)}
        hideBook={() => hideBookHandler(id)}
        sendUpdatedBook={sendUpdatedBookHandler}
      />
    </BookContext.Provider>
  );
};
export default SingleBook;
