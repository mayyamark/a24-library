import pool from './pool.js';

/** Logs borrow date for the given book. */
const logBorrowing = async (userId, bookId) => {
  const insertSql = `
        insert into history(user_id, book_id, borrowed)
        values (?, ?, ?)
    `;
  const insertData = await pool.query(insertSql, [userId, bookId, new Date()]);

  const historySql = `
        select borrowed 
        from history
        where id = ?;
    `;
  const historyData = await pool.query(historySql, [insertData.insertId]);

  return historyData?.[0].borrowed;
};

/** Logs return date for the given book. */
const logReturning = async (userId, bookId) => {
  const historyControlSql = `
        select *
        from history
        where user_id = ? and book_id = ? and returned is null;
    `;

  const historyControlData = await pool.query(historyControlSql, [
    userId,
    bookId,
  ]);

  const updateSql = `
        update history set
        returned = ?
        where id = ?;
    `;

  const updateData = await pool.query(updateSql, [
    new Date(),
    historyControlData[0].id,
  ]);

  const historySql = `
        select h.id, b.book_id as bookId, b.name, DATE_FORMAT(h.borrowed, '%d %b %Y at %H:%i:%s') as borrowed, DATE_FORMAT(h.returned, '%d %b %Y at %H:%i:%s') as returned
        from history h
        join books b on b.book_id = h.book_id
        where id = ?;
    `;
  const historyData = await pool.query(historySql, [historyControlData[0].id]);

  return historyData?.[0];
};

/** Returns the given user's activity. */
const getByUserId = async (userId) => {
  const historySql = `
        select h.id, b.book_id as bookId, b.name, DATE_FORMAT(h.borrowed, '%d %b %Y at %H:%i:%s') as borrowed, DATE_FORMAT(h.returned, '%d %b %Y at %H:%i:%s') as returned        
        from history h
        join books b on b.book_id = h.book_id
        where h.user_id =  ?;
    `;

  return await pool.query(historySql, [userId]);
};
export default {
  logBorrowing,
  logReturning,
  getByUserId,
};
