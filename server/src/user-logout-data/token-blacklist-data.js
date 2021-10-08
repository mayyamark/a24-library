import userLogoutPool from './user-logout-pool.js';

const checkTokenBlacklisted = async (token) => {
  const blackListSql = `
        select * from blacklist 
        where token = ?;
    `;

  const blackListData = await userLogoutPool.query(blackListSql, [token]);
  
  return blackListData[0];
};

const setTokenBlacklisted = async (token) => {
  const insertSql = `
        insert into blacklist 
        (token) values(?); 
    `;
  const blacklistData = await userLogoutPool.query(insertSql, [token]);
  
  return blacklistData[0];
};

export default {
  checkTokenBlacklisted,
  setTokenBlacklisted,
};
