import pool from './pool.js';

/** Returns all not-deleted reviews for the given book. */
const getAllForBook = async (bookId) => {
  const reviewsSql = `
        select r.book_id as bookId, r.review_id as reviewId, r.text, u.username as user, u.user_id as userId
        from reviews r
        join users u on u.user_id = r.user_id
        where book_id = ? and r.is_deleted = 0;
    `;

  return await pool.query(reviewsSql, [bookId]);
};

/** Returns a single not-deleted review by the given book and user. **/
const getSingleByGivenBookAndUser = async (bookId, userId) => {
  const reviewSql = `
        select r.review_id, u.user_id, u.username, r.text
        from reviews r
        join users u on u.user_id = r.user_id
        where r.book_id = ? and u.user_id = ? and r.is_deleted = 0;
    `;
  const reviewData = await pool.query(reviewSql, [bookId, userId]);
  return reviewData?.[0];
};

/** Creates new review. **/
const create = async (bookId, userId, text) => {
  const insertSql = `
        insert into reviews(book_id, user_id, text) 
        values(?, ?, ?);
    `;

  const insertData = await pool.query(insertSql, [bookId, userId, text]);

  const reviewSql = `
        select r.review_id as reviewId, b.name as bookName, u.user_id, u.username as user, r.text
        from reviews r
        join books b on b.book_id = r.book_id
        join users u on u.user_id = r.user_id
        where review_id = ? and r.is_deleted = 0;
    `;

  const reviewData = await pool.query(reviewSql, [insertData.insertId]);
  return reviewData?.[0];
};

/** Returns all the reviews for the given book. **/
const getAllForBookAsAdmin = async (bookId) => {
  const reviewsSql = `
        select r.book_id as bookId, r.review_id as reviewId, r.text, u.username as user, u.user_id as userId, r.is_deleted as isDeleted
        from reviews r
        join users u on u.user_id = r.user_id
        where book_id = ?;
    `;

  return await pool.query(reviewsSql, [bookId]);
};

/** Returns a single, formatted review by its id. **/
const getByIdAsAdmin = async (reviewId) => {
  const reviewSql = `
        select r.review_id as reviewId, r.text, u.username as user, u.user_id as userId, r.is_deleted as isDeleted
        from reviews r
        join users u on u.user_id = r.user_id
        where review_id = ?;
    `;

  const reviewData = await pool.query(reviewSql, [reviewId]);
  return reviewData?.[0];
};

/** Returns a single review by its id. **/
const getById = async (reviewId) => {
  const reviewSql = `
        select * from reviews 
        where review_id = ?;
    `;

  const reviewData = await pool.query(reviewSql, [reviewId]);
  return reviewData?.[0];
};

/** Updates the given review's text. **/
const updateById = async (reviewId, text) => {
  const updateSql = `
        update reviews 
          set text = ? 
        where review_id = ?
    `;

  return await pool.query(updateSql, [text, reviewId]);
};

/** Deletes the given review. **/
const deleteById = async (reviewId) => {
  const updateSql = `
        update reviews 
          set is_deleted = true 
        where review_id = ?
    `;

  return await pool.query(updateSql, [reviewId]);
};

/** Returns all votes for the given review. **/
const getAllVotes = async (reviewId) => {
  const votesSql = `
        select r.review_id as reviewId, count(case when ulr.vote_id= 1 then 1 end) as likes,
        count(case when ulr.vote_id= 2 then 1 end) as dislikes
        from user_liked_reviews ulr
        left join reviews r on ulr.review_id = r.review_id
        where r.review_id = ?;
    `;
  const votesData = await pool.query(votesSql, [reviewId]);
  return votesData?.[0];
};

/** Returns the user vote for the given review. **/
const getSingleVote = async (reviewId, userId) => {
  const voteSql = `
        select ulr.id, ulr.user_id, ulr.review_id, v.vote
        from user_liked_reviews ulr
        join votes v on v.vote_id = ulr.vote_id
        where ulr.review_id = ? and ulr.user_id = ?;
    `;
  const votesData = await pool.query(voteSql, [reviewId, userId]);
  return votesData?.[0];
};

/** Creates a new review vote. **/
const createVote = async (reviewId, userId, vote) => {
  const insertSql = `
        insert into user_liked_reviews(user_id, review_id, vote_id)
        values (?, ?, (select vote_id from votes where vote = ?));
    `;
  const insertData = await pool.query(insertSql, [userId, reviewId, vote]);

  const voteSql = `
        select ulr.id, ulr.user_id as voterId, ulr.review_id, v.vote
        from user_liked_reviews ulr       
        join votes v on v.vote_id = ulr.vote_id
        where ulr.review_id = ?;
    `;
  const voteData = await pool.query(voteSql, [reviewId]);
  return voteData?.[0];
};

/** Updates the given review vote. **/
const updateVote = async (id, reviewId, vote) => {
  const voteControlSql = `
        select vote_id from votes 
        where vote = ?
    `;
  const voteControlData = await pool.query(voteControlSql, [vote]);
  const voteId = await voteControlData[0].vote_id;

  const updateSql = `
        update user_liked_reviews set
         vote_id = ? 
        where id = ?;
    `;
  const updateData = await pool.query(updateSql, [voteId, id]);

  const votesSql = `
        select ulr.id, ulr.user_id as voterId, ulr.review_id, v.vote
        from user_liked_reviews ulr       
        join votes v on v.vote_id = ulr.vote_id
        where ulr.review_id = ?;
    `;
  const votesData = await pool.query(votesSql, [reviewId]);
  return votesData?.[0];
};

/** Updates the given review's text as admin. **/
const updateTextAsAdmin = async (reviewId, text) => {
  const updateSql = `
        update reviews set
         text = ? 
        where review_id = ?
    `;

  const updateData = await pool.query(updateSql, [text, reviewId]);

  const reviewsSql = `
        select review_id, book_id as bookId, user_id as userId, text, is_deleted as isDeleted
        from reviews 
        where review_id = ?
    `;

  const reviewsData = await pool.query(reviewsSql, [reviewId]);
  return reviewsData?.[0];
};

/** Updates the review's delete status as admin. **/
const updateIsDeletedAsAdmin = async (reviewId, isDeleted) => {
  const updateSql = `
        update reviews set
         is_deleted = ? 
        where review_id = ?
    `;

  const updateData = await pool.query(updateSql, [isDeleted, reviewId]);

  const reviewSql = `
        select review_id, book_id as bookId, user_id as userId, text, is_deleted as isDeleted
        from reviews 
        where review_id = ?
    `;

  const reviewData = await pool.query(reviewSql, [reviewId]);
  return reviewData?.[0];
};

/** Return all reviews for the given user. **/
const getAllReviewsForUser = async (userId) => {
  const reviewsSql = `
        select reviews.review_id as id, reviews.text as text, books.book_id as bookId, books.name as bookName, books.image as bookImage
        from reviews
        join books on reviews.book_id = books.book_id
        where user_id = ? and reviews.is_deleted = 0;
    `;

  const reviewsData = await pool.query(reviewsSql, [userId]);

  if (reviewsData) {
    return reviewsData.slice(0, reviewsData.length);
  }

  return null;
};

export default {
  getAllForBook,
  getSingleByGivenBookAndUser,
  create,
  getByIdAsAdmin,
  getById,
  updateById,
  deleteById,
  getAllVotes,
  getSingleVote,
  createVote,
  updateVote,
  getAllForBookAsAdmin,
  updateTextAsAdmin,
  updateIsDeletedAsAdmin,
  getAllReviewsForUser,
};
