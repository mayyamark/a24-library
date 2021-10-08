import React, { useState } from 'react';
import swal from 'sweetalert';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import BASE_URL from '../../common/base-url';
import Loader from '../../components/Loader/Loader';
import CreateBookView from '../../components/CreateBook/CreateBookView';
import Home from '../../components/Home/Home';

const CreateBook = () => {
  const { currentUser } = useAuth();
  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendNewBookHandler = (newBookData) => {
    setLoading(true);

    fetch(`${BASE_URL}/admin/books`, {
      method: 'POST',
      headers: new Headers({
        Authorization: `Bearer ${currentUser.token}`,
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(newBookData),
    })
      .then((res) => res.json())
      .then((data) => {
        swal({
          title: 'Success!',
          text: `${data.successMessage}`,
          icon: 'success',
          button: 'Nice!',
        });

        history.push(`/books/${data.book.bookId}`);
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
      .finally(() => {
        setLoading(false);
      });
  };

  if (error) {
    return <Home />;
  }

  if (loading) {
    return <Loader />;
  }

  return <CreateBookView sendBook={sendNewBookHandler} />;
};

export default CreateBook;
