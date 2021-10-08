import pool from './pool.js';

/** Returns all not-deleted books. **/
const getAll = async () => {
  const booksSql = `
        select b.book_id as bookId, b.name, b.image, b.description, concat(a.first_name, ' ', a.last_name) as author, g.genre, bs.status 
        from books b
        join book_statuses bs on bs.status_id = b.status_id
        join authors a on a.author_id = b.author_id
        join generes g on g.genre_id = b.genre_id
        where b.is_deleted = 0
        order by b.book_id asc;
    `;

  return await pool.query(booksSql);
};

/** Returns all not-deleted paginated books by search params. **/
const searchByWithPages = async (name, author, genre, offset, limit) => {
  let booksSql = `
        select b.book_id as bookId, b.name, b.image, b.description, concat(a.first_name, ' ', a.last_name) as author, g.genre, bs.status 
        from books b
        join book_statuses bs on bs.status_id = b.status_id
        join authors a on a.author_id = b.author_id
        join generes g on g.genre_id = b.genre_id
        where b.is_deleted = 0
    `;
  if (name) {
    booksSql += ` and b.name like '%${name}%'`;
  }
  if (author) {
    booksSql += ` and concat(a.first_name, ' ', a.last_name) like '%${author}%'`;
  }
  if (genre) {
    booksSql += ` and g.genre like '${genre}'`;
  }
  booksSql += ' order by b.book_id asc';
  if (offset !== undefined && limit) {
    booksSql += ` limit ${limit} offset ${offset}`;
  }

  return await pool.query(booksSql);
};

/** Returns all not-deleted books by search params. **/
const searchBy = async (name, author, genre) => {
  let booksSql = `
        select b.book_id as bookId, b.name, b.image, b.description, concat(a.first_name, ' ', a.last_name) as author, g.genre, bs.status 
        from books b
        join book_statuses bs on bs.status_id = b.status_id
        join authors a on a.author_id = b.author_id
        join generes g on g.genre_id = b.genre_id
        where b.is_deleted = 0
    `;
  if (name) {
    booksSql += ` and b.name like '%${name}%'`;
  }
  if (author) {
    booksSql += ` and concat(a.first_name, ' ', a.last_name) like '%${author}%'`;
  }
  if (genre) {
    booksSql += ` and g.genre like '${genre}'`;
  }
  booksSql += ' order by b.book_id asc';

  return await pool.query(booksSql);
};

/** Returns a single not-deleted book. **/
const getSingle = async (bookId) => {
  const bookSql = `
        select b.book_id as bookId, b.name, b.image, b.description, concat(a.first_name, ' ', a.last_name) as author, g.genre, bs.status 
        from books b
        join book_statuses bs on bs.status_id = b.status_id
        join authors a on a.author_id = b.author_id
        join generes g on g.genre_id = b.genre_id
        where b.is_deleted = 0 and b.book_id = ?;
    `;

  const bookData = await pool.query(bookSql, [bookId]);
  return bookData?.[0];
};

/** Updates the book's status. **/
const updateStatus = async (bookId, statusId) => {
  const updateSql = `
        update books set
          status_id = ?
        where book_id = ? and is_deleted = 0;
    `;

  const updateResult = await pool.query(updateSql, [statusId, bookId]);

  const bookSql = `
        select b.book_id as bookId, b.name, b.image, b.description, concat(a.first_name, ' ', a.last_name) as author, g.genre, bs.status, b.is_deleted as isDeleted 
        from books b
        join book_statuses bs on bs.status_id = b.status_id
        join authors a on a.author_id = b.author_id
        join generes g on g.genre_id = b.genre_id
        where b.is_deleted = 0 and b.book_id = ?;
    `;

  const bookData = await pool.query(bookSql, [bookId]);
  return bookData?.[0];
};

/** Returns all books. **/
const getAllAsAdmin = async () => {
  const booksSql = `
        select b.book_id as bookId, b.name, b.image, b.description, concat(a.first_name, ' ', a.last_name) as author, g.genre, bs.status, b.is_deleted as isDeleted 
        from books b
        join book_statuses bs on bs.status_id = b.status_id
        join authors a on a.author_id = b.author_id
        join generes g on g.genre_id = b.genre_id
        order by b.book_id asc;
    `;

  return await pool.query(booksSql);
};

/** Returns all paginated books by search params. **/
const searchByAsAdminWithPages = async (name, author, genre, offset, limit) => {
  let booksSql = `
        select b.book_id as bookId, b.name, b.image, b.description, concat(a.first_name, ' ', a.last_name) as author, g.genre, bs.status, b.is_deleted as isDeleted 
        from books b
        join book_statuses bs on bs.status_id = b.status_id
        join authors a on a.author_id = b.author_id
        join generes g on g.genre_id = b.genre_id
    `;
  if (name) {
    booksSql += ` and b.name like '%${name}%'`;
  }
  if (author) {
    booksSql += ` and concat(a.first_name, ' ', a.last_name) like '%${author}%'`;
  }
  if (genre) {
    booksSql += ` and g.genre like '${genre}'`;
  }
  booksSql += ' order by b.book_id asc';
  if (offset !== undefined && limit) {
    booksSql += ` limit ${limit} offset ${offset}`;
  }

  return await pool.query(booksSql);
};

/** Returns all books by search params. **/
const searchByAsAdmin = async (name, author, genre) => {
  let booksSql = `
        select b.book_id as bookId, b.name, b.image, b.description, concat(a.first_name, ' ', a.last_name) as author, g.genre, bs.status, b.is_deleted as isDeleted 
        from books b
        join book_statuses bs on bs.status_id = b.status_id
        join authors a on a.author_id = b.author_id
        join generes g on g.genre_id = b.genre_id
    `;
  if (name) {
    booksSql += ` and b.name like '%${name}%'`;
  }
  if (author) {
    booksSql += ` and concat(a.first_name, ' ', a.last_name) like '%${author}%'`;
  }
  if (genre) {
    booksSql += ` and g.genre like '${genre}'`;
  }
  booksSql += ' order by b.book_id asc';

  return await pool.query(booksSql);
};

/** Returns a single book. **/
const getSingleAsAdmin = async (bookId) => {
  const bookSql = `
        select b.book_id as bookId, b.name, b.image, b.description, concat(a.first_name, ' ', a.last_name) as author, g.genre, bs.status, b.is_deleted as isDeleted 
        from books b
        join book_statuses bs on bs.status_id = b.status_id
        join authors a on a.author_id = b.author_id
        join generes g on g.genre_id = b.genre_id
        where b.book_id = ?;
    `;

  const bookData = await pool.query(bookSql, [bookId]);
  return bookData?.[0];
};

/** Returns a single book's name. **/
const getByName = async (name) => {
  const bookSql = `
        select name 
        from books
        where name = ?;
    `;
  const bookData = await pool.query(bookSql, [name]);

  return bookData?.[0];
};

/** Returns a the author's id. **/
const getAuthorId = async (firstName, lastName) => {
  const bookSql = `
        select * 
        from authors
        where first_name = ? and last_name = ?
    `;
  const bookData = await pool.query(bookSql, [firstName, lastName]);

  if (bookData[0]) {
    return bookData[0].author_id;
  }

  const insertSql = `
        insert into authors(first_name, last_name)
        values (?, ?)
    `;

  const insertData = await pool.query(insertSql, [firstName, lastName]);
  return await insertData.insertId;
};

/** Returns a the genere's id. **/
const getGenreId = async (genre) => {
  const bookSql = `
        select * 
        from generes
        where genre = ?
    `;
  const bookData = await pool.query(bookSql, [genre]);
  if (bookData[0]) {
    return bookData[0].genre_id;
  }

  const insertSql = `
        insert into generes(genre)
        values (?)
    `;

  const insertData = await pool.query(insertSql, [genre]);
  return await insertData.insertId;
};

/** Creates new book. **/
const create = async (
  name,
  image,
  description,
  authorId,
  genreId,
  statusId,
) => {
  const insertSql = `
        insert into books(name, image, description, author_id, genre_id, status_id)
        values (?, ?, ?, ?, ?, ?)
    `;

  const insertData = await pool.query(insertSql, [
    name,
    image,
    description,
    authorId,
    genreId,
    statusId,
  ]);

  const bookSql = `
        select b.book_id as bookId, b.name, b.image, b.description, concat(a.first_name, ' ', a.last_name) as author, g.genre, bs.status, b.is_deleted as isDeleted 
        from books b
        join book_statuses bs on bs.status_id = b.status_id
        join authors a on a.author_id = b.author_id
        join generes g on g.genre_id = b.genre_id
        where b.book_id = ?;
    `;

  const bookData = await pool.query(bookSql, [insertData.insertId]);
  return bookData?.[0];
};

/** Updates the given book's delete status. **/
const updateIsDeleted = async (bookId, isDeleted) => {
  const updateSql = `
        update books set
         is_deleted = ?
        where book_id = ?
    `;
  const updateData = await pool.query(updateSql, [isDeleted, bookId]);

  const bookSql = `
        select b.book_id as bookId, b.name, b.image, b.description, concat(a.first_name, ' ', a.last_name) as author, g.genre, bs.status, b.is_deleted as isDeleted
        from books b
        join book_statuses bs on bs.status_id = b.status_id
        join authors a on a.author_id = b.author_id
        join generes g on g.genre_id = b.genre_id
        where b.book_id = ?;
    `;

  const bookData = await pool.query(bookSql, [bookId]);
  return bookData?.[0];
};

/** Updates the given book's name. **/
const updateName = async (bookId, name) => {
  const updateSql = `
        update books set
         name = ?
        where book_id = ?
    `;
  const updateData = await pool.query(updateSql, [name, bookId]);

  const bookSql = `
        select b.book_id as bookId, b.name, b.image, b.description, concat(a.first_name, ' ', a.last_name) as author, g.genre, bs.status, b.is_deleted as isDeleted
        from books b
        join book_statuses bs on bs.status_id = b.status_id
        join authors a on a.author_id = b.author_id
        join generes g on g.genre_id = b.genre_id
        where b.book_id = ?;
    `;

  const bookData = await pool.query(bookSql, [bookId]);
  return bookData?.[0];
};

/** Updates the given book's image URL. **/
const updateImage = async (bookId, image) => {
  const updateSql = `
        update books set
         image = ?
        where book_id = ?
    `;
  const updateData = await pool.query(updateSql, [image, bookId]);

  const bookSql = `
        select b.book_id as bookId, b.name, b.image, b.description, concat(a.first_name, ' ', a.last_name) as author, g.genre, bs.status, b.is_deleted as isDeleted
        from books b
        join book_statuses bs on bs.status_id = b.status_id
        join authors a on a.author_id = b.author_id
        join generes g on g.genre_id = b.genre_id
        where b.book_id = ?;
    `;

  const bookData = await pool.query(bookSql, [bookId]);
  return bookData?.[0];
};

/** Updates the given book's description. **/
const updateDescription = async (bookId, description) => {
  const updateSql = `
        update books set
         description = ?
        where book_id = ?
    `;
  const updateData = await pool.query(updateSql, [description, bookId]);

  const bookSql = `
        select b.book_id as bookId, b.name, b.image, b.description, concat(a.first_name, ' ', a.last_name) as author, g.genre, bs.status, b.is_deleted as isDeleted
        from books b
        join book_statuses bs on bs.status_id = b.status_id
        join authors a on a.author_id = b.author_id
        join generes g on g.genre_id = b.genre_id
        where b.book_id = ?;
    `;

  const bookData = await pool.query(bookSql, [bookId]);
  return bookData?.[0];
};

/** Updates the given book's author. **/
const updateAuthor = async (bookId, authorId) => {
  const updateSql = `
        update books set
         author_id = ?
        where book_id = ?
    `;
  const updateData = await pool.query(updateSql, [authorId, bookId]);

  const bookSql = `
        select b.book_id as bookId, b.name, b.image, b.description, concat(a.first_name, ' ', a.last_name) as author, g.genre, bs.status, b.is_deleted as isDeleted
        from books b
        join book_statuses bs on bs.status_id = b.status_id
        join authors a on a.author_id = b.author_id
        join generes g on g.genre_id = b.genre_id
        where b.book_id = ?;
    `;

  const bookData = await pool.query(bookSql, [bookId]);
  return bookData?.[0];
};

/** Updates the given book's genre. **/
const updateGenre = async (bookId, genreId) => {
  const updateSql = `
        update books set
         genre_id = ?
        where book_id = ?
    `;
  const updateData = await pool.query(updateSql, [genreId, bookId]);

  const bookSql = `
        select b.book_id as bookId, b.name, b.image, b.description, concat(a.first_name, ' ', a.last_name) as author, g.genre, bs.status, b.is_deleted as isDeleted
        from books b
        join book_statuses bs on bs.status_id = b.status_id
        join authors a on a.author_id = b.author_id
        join generes g on g.genre_id = b.genre_id
        where b.book_id = ?;
    `;

  const bookData = await pool.query(bookSql, [bookId]);
  return bookData?.[0];
};

/** Updates the given book's status as admin. **/
const updateStatusAsAdmin = async (bookId, statusId) => {
  const updateSql = `
        update books set
         status_id = ?
        where book_id = ?
    `;
  const updateData = await pool.query(updateSql, [statusId, bookId]);

  const bookSql = `
        select b.book_id as bookId, b.name, b.image, b.description, concat(a.first_name, ' ', a.last_name) as author, g.genre, bs.status, b.is_deleted as isDeleted
        from books b
        join book_statuses bs on bs.status_id = b.status_id
        join authors a on a.author_id = b.author_id
        join generes g on g.genre_id = b.genre_id
        where b.book_id = ?;
    `;

  const bookData = await pool.query(bookSql, [bookId]);
  return bookData?.[0];
};

/** Hides the book from users. **/
const remove = async (bookId) => {
  const updateSql = `
        update books set
        is_deleted = 1
        where book_id = ?
    `;
  const updateData = await pool.query(updateSql, [bookId]);

  const bookSql = `
        select b.book_id as bookId, b.name, b.image, b.description, concat(a.first_name, ' ', a.last_name) as author, g.genre, bs.status, b.is_deleted as isDeleted 
        from books b
        join book_statuses bs on bs.status_id = b.status_id
        join authors a on a.author_id = b.author_id
        join generes g on g.genre_id = b.genre_id
        where b.book_id = ?;
    `;

  const bookData = await pool.query(bookSql, [bookId]);
  return bookData?.[0];
};

export default {
  getAll,
  searchByWithPages,
  searchBy,
  getSingle,
  updateStatus,
  getAllAsAdmin,
  searchByAsAdminWithPages,
  searchByAsAdmin,
  getSingleAsAdmin,
  getByName,
  getAuthorId,
  getGenreId,
  create,
  updateIsDeleted,
  updateName,
  updateImage,
  updateDescription,
  updateAuthor,
  updateGenre,
  updateStatusAsAdmin,
  remove,
};
