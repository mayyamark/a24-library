import pool from './pool.js';

/** Creates a new ban status. */
const createUserBanStatus = async (userId, isBanned, description) => {
  const insertSql = `
        insert into ban_statuses (is_banned, description) 
        values (?, ?);
    `;
  const insertData = await pool.query(insertSql, [isBanned, description]);
  const banStatusId = insertData.insertId;

  const updateSql = `
        update users 
          set ban_status_id = ? 
        where user_id = ?;
    `;
  await pool.query(updateSql, [banStatusId, userId]);
};

/** Updates user's ban status. */
const setUserBanStatus = async (banStatusId, isBanned, description) => {
  const updateSql = `
        update ban_statuses 
          set is_banned = ?, description = ? 
        where ban_status_id = ?
    `;
  await pool.query(updateSql, [isBanned, description, banStatusId]);
};

/** Gets the ban status for the given user. */
const getUserBanStatus = async (userId) => {
  const banStatusSql = `
        select is_banned, description 
        from ban_statuses 
        where ban_status_id = (select ban_status_id from users where user_id = ?);
    `;
  return (await pool.query(banStatusSql, userId))[0];
};

export default {
  createUserBanStatus,
  setUserBanStatus,
  getUserBanStatus,
};
