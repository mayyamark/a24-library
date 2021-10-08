import pool from './pool.js';

/** Checks if the user has borrowed and returned the book. */
const checkBook = async (userId, bookId) => {
  const historySql = `
        select *
        from history
        where user_id = ? and book_id = ? and (borrowed is not null and returned is not null);
    `;
  const historyData = await pool.query(historySql, [userId, bookId]);
  return historyData?.[0];
};

/** Checks if the user has wtitten a rewview for the book. */
const checkReview = async (userId, bookId) => {
  const reviewsSql = `
        select * 
        from reviews
        where user_id = ? and book_id = ? and is_deleted = 0;
    `;
  const reviewsData = await pool.query(reviewsSql, [userId, bookId]);
  return reviewsData?.[0];
};

/** Returns the rate for the given book by the given user. */
const getRaw = async (userId, bookId) => {
  const rateSql = `
        select * 
        from book_rates
        where user_id = ? and book_id = ?;
    `;
  const rateData = await pool.query(rateSql, [userId, bookId]);
  return rateData?.[0];
};

/** Returns the average rate for the book. */
const getAverage = async (bookId) => {
  const rateSql = `
        select avg(rate) as averageRate
        from book_rates
        where book_id = ?;
    `;
  const rateData = await pool.query(rateSql, [bookId]);
  return rateData[0].averageRate;
};

/** Creates a new rate for the given book. */
const create = async (bookId, userId, rate) => {
  const insertSql = `
        insert into book_rates(book_id, user_id, rate) 
        values(?, ?, ?);
    `;

  const insertData = await pool.query(insertSql, [bookId, userId, rate]);

  const rateSql = `
        select * 
        from book_rates
        where rate_id = ?;
    `;
  const rateData = await pool.query(rateSql, [insertData.insertId]);
  return rateData?.[0];
};

/** Updates a rate. */
const update = async (rate, rateId) => {
  const updateSql = `
        update book_rates set
            rate = ?
        where rate_id = ?
    `;

  const updateData = await pool.query(updateSql, [rate, rateId]);

  const rateSql = `
        select * 
        from book_rates
        where rate_id = ?;
    `;
  const rateData = await pool.query(rateSql, [rateId]);
  return rateData?.[0];
};
export default {
  checkBook,
  checkReview,
  getRaw,
  getAverage,
  create,
  update,
};
