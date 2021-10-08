import React from 'react';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import { useHistory } from 'react-router-dom';

const Logout = () => {
  const { currentUser, logout, error } = useAuth();
  const history = useHistory();

  const handleLogout = () => {
    if (currentUser) {
      logout()
        .then(() => history.push('/login'))
        .catch(() => alert(`Something went wrong: ${error}`));
    } else {
      history.push('/login');
    }
  };

  return (
    <>
      <Button variant="outline-primary" onClick={handleLogout}>
        {currentUser ? `Logout ${currentUser.username}` : 'Log in'}
      </Button>
    </>
  );
};

export default Logout;
