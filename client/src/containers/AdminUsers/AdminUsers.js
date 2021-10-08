import React, { useEffect, useState } from 'react';
import BASE_URL from '../../common/base-url';
import { useAuth } from '../../contexts/AuthContext';
import UserManagement from './UserManagement';

const AdminUsers = () => {
  const { currentUser } = useAuth();
  const [users, setUsers] = useState();
  const [update, setUpdate] = useState();
  useEffect(() => {
    const fetchAllUsers = () => {
      fetch(`${BASE_URL}/admin/users`, {
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
            return res.json();
          } else {
            return res
              .json()
              .then((beErrMsg) => Promise.reject(new Error(beErrMsg.message)));
          }
        })
        .then((body) => setUsers(body.users))
        .catch((err) => alert(err.message));
    };

    if (currentUser) {
      fetchAllUsers();
    }
  }, [currentUser, update]);

  return (
    <div id="admin-users">
      {users &&
        users.map((user) => (
          <UserManagement key={user.id} update={setUpdate} user={user} />
        ))}
    </div>
  );
};

export default AdminUsers;
