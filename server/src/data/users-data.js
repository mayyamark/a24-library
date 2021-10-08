import pool from './pool.js';

/** Returns all users' ids. */
const getAllIds = async () => {
  const usersSql = `
        select user_id
        from users;
    `;

  return await pool.query(usersSql);
};

/** Returns a single user. */
const getById = async (userId) => {
  const userSql = `
        select * 
        from users 
        where user_id = ?;
    `;
  const userData = await pool.query(userSql, userId);
  return userData[0];
};

/** Returns a single user by his username. */
const getByUsername = async (username) => {
  const userSql = `
        select * 
        from users 
        where username = ?;
    `;
  const userData = await pool.query(userSql, username);
  return userData[0];
};

/** Creates a user. */
const createUser = async (username, password, is_admin = false) => {
  const insertSql = `
        insert into users (username, password, is_admin) 
        values (?, ?, ?);
    `;
  const insertData = await pool.query(insertSql, [
    username,
    password,
    is_admin,
  ]);
  return {
    id: insertData.insertId,
    username: username,
  };
};

/** Deletes the user. */
const deleteUser = async (userId) => {
  const deleteSql = `
        delete from users 
        where user_id = ?
    `;
  return await pool.query(deleteSql, [userId]);
};

/** Returns all users. */
const getAllUsers = async () => {
  const usersSql = `
        select users.user_id, users.username, users.is_admin, ban_statuses.is_banned, ban_statuses.description 
        from users
        left join ban_statuses ON users.ban_status_id=ban_statuses.ban_status_id;
    `;
  const usersData = await pool.query(usersSql);
  return usersData.slice(0, usersData.length).map((item) => {
    return {
      id: item.user_id,
      name: item.username,
      admin: item.is_admin,
      banned: item.is_banned,
      bannedFor: item.description,
    };
  });
};

/** Updates the given user's role. */
const updateUserRole = async (userId, is_admin) => {
  const updateSql = `
        update users 
          set is_admin = ? 
        where user_id = ?
    `;
  await pool.query(updateSql, [is_admin, userId]);
};

export default {
  getAllIds,
  getByUsername,
  createUser,
  getById,
  deleteUser,
  getAllUsers,
  updateUserRole,
};
