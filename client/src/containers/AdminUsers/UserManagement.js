import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import BASE_URL from '../../common/base-url';
import './UserManagement.css';

const UserManagement = (props) => {
  const { currentUser } = useAuth();

  const deleteUser = () => {
    fetch(`${BASE_URL}/admin/users/${props.user.id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${currentUser.token}`,
      },
      body: null,
    })
      .then((res) => {
        if (!res.ok) {
          return res
            .json()
            .then((beErrMsg) => Promise.reject(new Error(beErrMsg.message)));
        }
        return Promise.resolve();
      })
      .then(() => props.update({ userid: props.user.id, deleted: true }))
      .catch((err) => alert(err.message));
  };

  const banUser = () => {
    fetch(`${BASE_URL}/admin/users/${props.user.id}/banstatus`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${currentUser.token}`,
      },
      body: JSON.stringify({
        is_banned: !props.user.banned,
        description: !props.user.banned
          ? `banned by admin ${currentUser.username}`
          : `ban cleared by admin ${currentUser.username}`,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          return res
            .json()
            .then((beErrMsg) => Promise.reject(new Error(beErrMsg.message)));
        }
        return Promise.resolve();
      })
      .then(() =>
        props.update({ userid: props.user.id, ban: !props.user.banned }),
      )
      .catch((err) => alert(err.message));
  };

  const makeAdmin = () => {
    fetch(`${BASE_URL}/admin/users/${props.user.id}/role`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${currentUser.token}`,
      },
      body: JSON.stringify({
        role: props.user.admin ? 'User' : 'Admin',
      }),
    })
      .then((res) => {
        if (!res.ok) {
          return res
            .json()
            .then((beErrMsg) => Promise.reject(new Error(beErrMsg.message)));
        }
        return Promise.resolve();
      })
      .then(() =>
        props.update({ userid: props.user.id, admin: !props.user.admin }),
      )
      .catch((err) => alert(err.message));
  };

  return (
    <div>
      <Card id="single-user-card" className="text-center">
        <Card.Body>
          <Card.Title>{props.user.name}</Card.Title>
          <Card.Text>
            {props.user.admin ? 'Admin' : 'User'}{' '}
            {props.user.banned > 0 && `${props.user.bannedFor}`}
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <Button
            variant="outline-secondary"
            className="text-center mt-1"
            onClick={banUser}
          >
            {props.user.banned ? 'Unban' : 'Ban'}
          </Button>
          <Button
            variant="outline-primary"
            className="text-center mt-1"
            onClick={makeAdmin}
          >
            Make {props.user.admin ? 'User' : 'Admin'}
          </Button>
          <Button
            variant="outline-danger"
            className="text-center mt-1"
            onClick={deleteUser}
          >
            Delete
          </Button>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default UserManagement;
