import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import BASE_URL from './../common/base-url';
import jwt_decode from 'jwt-decode';

const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};
export const AuthProvider = ({ children }) => {
  const history = useHistory();
  const tokenExpiredHandler = () => {
    if (currentUser) {
      setCurrentUser(null);
    }
    history.push('/login');
  };

  const clearCurrentUser = () => {
    if (currentUser) {
      clearTimeout(currentUser.expiryTimer);
      setCurrentUser(null);
    }
    localStorage.removeItem('token');
  };

  const currentUserFromToken = (token) => {
    if (token) {
      const decoded = jwt_decode(token);

      if (Date.now() > decoded.exp * 1000) {
        history.push('/login');
        return null;
      }

      const timeToExpire = decoded.exp * 1000 - Date.now();
      return {
        token: token,
        username: decoded.username,
        role: decoded.role,
        expiryTimer: setTimeout(tokenExpiredHandler, timeToExpire),
      };
    }
    return null;
  };

  const [currentUser, setCurrentUser] = useState(() =>
    currentUserFromToken(localStorage.getItem('token')),
  );
  const [error, setError] = useState();

  const authenticate = (action, username, password) => {
    setError(null);
    clearCurrentUser();

    return fetch(`${BASE_URL}${action}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res
            .json()
            .then((beErrMsg) => Promise.reject(new Error(beErrMsg.message)));
        }
      })
      .then((body) => {
        localStorage.setItem('token', body.token);
        setCurrentUser(currentUserFromToken(body.token));
        return Promise.resolve();
      })
      .catch((err) => {
        setError(err.message);
        return Promise.reject();
      });
  };

  const register = (username, password) => {
    return authenticate('/users', username, password);
  };

  const login = (username, password) => {
    return authenticate('/users/login', username, password);
  };

  const logout = () => {
    setError(null);
    return fetch(`${BASE_URL}/users/logout`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${currentUser.token}`,
      },
      body: null,
    })
      .then((res) => {
        if (res.ok || res.status === 401 || res.status === 403) {
          clearCurrentUser();
          return Promise.resolve();
        } else {
          return res
            .json()
            .then((beErrMsg) => Promise.reject(new Error(beErrMsg.message)));
        }
      })
      .catch((err) => {
        setError(err.message);
        return Promise.reject();
      });
  };

  const value = {
    currentUser,
    error,
    register,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
