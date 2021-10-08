import React, { useState, useEffect } from 'react';
import swal from 'sweetalert';
import { useHistory } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import BASE_URL from '../../common/base-url';
import Loader from '../../components/Loader/Loader';
import UserBookActivityDetails from '../../components/UserBookActivity/UserBookActivityDetails';
import Home from '../../components/Home/Home';

import './UserBookActivity.css';

const UserBookActivity = () => {
  const { currentUser } = useAuth();
  const history = useHistory();

  const [activity, setActivity] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [warn, setWarn] = useState(null);
  useEffect(() => {
    setLoading(true);

    fetch(`${BASE_URL}/books/history`, {
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
          setActivity(data);
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
  }, [currentUser, history]);

  const returnBookHandler = (id) => {
    setLoading(true);

    fetch(`${BASE_URL}/books/${id}`, {
      method: 'DELETE',
      headers: new Headers({
        Authorization: `Bearer ${currentUser.token}`,
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({ status_id: 1 }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          throw new Error(data.message);
        } else {
          const index = activity.findIndex((a) => a.id === data.returnInfo.id);
          const copy = [...activity];

          copy[index] = data.returnInfo;

          setActivity(copy);

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

  if (warn) {
    swal({
      title: 'Just to inform you:',
      text: `${warn}`,
      icon: 'info',
      button: 'Thanks!',
    });
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <UserBookActivityDetails
        activity={activity}
        returnBook={returnBookHandler}
      />
      {warn && (
        <h4 className="warn-message">
          Don't wait, browse from our{' '}
          <Nav.Link style={{ display: 'contents' }} href="/books?page=1">
            books
          </Nav.Link>
          !!
        </h4>
      )}
    </>
  );
};

export default UserBookActivity;
