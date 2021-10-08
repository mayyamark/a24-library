import serviceErrors from './service-errors.js';

/** Gets all of the not-hidden books with optional query parameters. */
const getBooks = (booksData) => {
  return async (name, author, genre, page, limit) => {
    if (page || name || author || genre) {
      let offset, settedLimit;
      if (limit) {
        settedLimit = limit;
        offset = (page - 1) * settedLimit;
      } else {
        settedLimit = 5;
        offset = (page - 1) * settedLimit;
      }

      const allSearchedBooks = await booksData.searchBy(name, author, genre);

      if (page) {
        const booksOnPage = await booksData.searchByWithPages(
          name,
          author,
          genre,
          offset,
          settedLimit,
        );

        return {
          books: booksOnPage,
          currentPage: page,
          bookCount: allSearchedBooks.length,
          hasNextPage: offset + settedLimit < allSearchedBooks.length,
          hasPreviousPage: page > 1,
        };
      } else {
        return {
          books: allSearchedBooks,
          bookCount: allSearchedBooks.length,
        };
      }
    } else {
      return await booksData.getAllAsAdmin();
    }
  };
};

/** Gets a single not-hidden book by its id. */
const getBookById = (booksData) => {
  return async (bookId) => {
    const book = await booksData.getSingle(bookId);

    if (!book) {
      return {
        bookError: serviceErrors.RESOURCE_NOT_FOUND,
        book: null,
      };
    }

    return { bookError: null, book: book };
  };
};
/** Updates the book's status to 'borrowed' or to 'free'. */
const updateBookStatus = (booksData) => {
  return async (bookId, statusId, statusName) => {
    const book = await booksData.getSingle(bookId);

    if (!book) {
      return {
        bookError: serviceErrors.RESOURCE_NOT_FOUND,
        book: null,
      };
    }

    if (book.status === statusName) {
      return {
        bookError: serviceErrors.BAD_REQUEST,
        book: null,
      };
    }

    const updatedBook = await booksData.updateStatus(bookId, statusId);

    return { bookError: null, book: updatedBook };
  };
};

/** Gets the book's average rate. */
const getBookAverageRate = (bookRatesData) => {
  return async (bookId) => {
    const averageRate = await bookRatesData.getAverage(bookId);

    if (!averageRate) {
      return 0;
    }
    return averageRate;
  };
};

/** Adds a new rate for the book. */
const rateBook = (bookRatesData) => {
  return async (userId, bookId, rate) => {
    const isBookBorrowedAndReturned = await bookRatesData.checkBook(
      userId,
      bookId,
    );

    if (!isBookBorrowedAndReturned) {
      return {
        rateError: serviceErrors.RESOURCE_NOT_FOUND,
        rate: null,
      };
    }
    const review = await bookRatesData.checkReview(userId, bookId);
    if (!review) {
      return {
        rateError: serviceErrors.BAD_REQUEST,
        rate: null,
      };
    }

    const exsistingRate = await bookRatesData.getRaw(userId, bookId);
    if (exsistingRate) {
      const _ = await bookRatesData.update(rate, exsistingRate.rate_id);
    } else {
      const _ = await bookRatesData.create(bookId, userId, rate);
    }

    const averageRate = await bookRatesData.getAverage(bookId);
    return {
      rateError: null,
      averageRate: averageRate,
    };
  };
};

/** Gets all books with optional query parameters. */
const getAllBooksAsAdmin = (booksData) => {
  return async (name, author, genre, page, limit) => {
    if (page || name || author || genre) {
      let offset, settedLimit;
      if (limit) {
        settedLimit = limit;
        offset = (page - 1) * settedLimit;
      } else {
        settedLimit = 5;
        offset = (page - 1) * settedLimit;
      }

      const allSearchedBooks = await booksData.searchByAsAdmin(
        name,
        author,
        genre,
      );

      if (page) {
        const booksOnPage = await booksData.searchByAsAdminWithPages(
          name,
          author,
          genre,
          offset,
          settedLimit,
        );

        return {
          books: booksOnPage,
          currentPage: page,
          bookCount: allSearchedBooks.length,
          hasNextPage: offset + settedLimit < allSearchedBooks.length,
          hasPreviousPage: page > 1,
        };
      } else {
        return {
          books: allSearchedBooks,
          bookCount: allSearchedBooks.length,
        };
      }
    } else {
      return await booksData.getAllAsAdmin();
    }
  };
};

/** Gets a single book by its id. */
const getBookByIdAsAdmin = (booksData) => {
  return async (bookId) => {
    const book = await booksData.getSingleAsAdmin(bookId);

    if (!book) {
      return {
        bookError: serviceErrors.RESOURCE_NOT_FOUND,
        book: null,
      };
    }

    return { bookError: null, book: book };
  };
};

/** Creates a new book. */
const createBook = (booksData) => {
  return async (
    name,
    image,
    description,
    authorFirstName,
    authorLastName,
    genre,
    statusId,
  ) => {
    const exsistingBook = await booksData.getByName(name);
    if (exsistingBook) {
      return {
        bookError: serviceErrors.DUPLICATE_RESOURCE,
        book: null,
      };
    }

    const authorId = await booksData.getAuthorId(
      authorFirstName,
      authorLastName,
    );

    const genreId = await booksData.getGenreId(genre);

    const newBook = await booksData.create(
      name,
      image,
      description,
      authorId,
      genreId,
      statusId,
    );

    return {
      bookError: null,
      book: newBook,
    };
  };
};

/** Updates the given book's data. */
const updateBook = (booksData) => {
  return async (
    bookId,
    name,
    image,
    description,
    authorFirstName,
    authorLastName,
    genre,
    statusId,
    isDeleted,
  ) => {
    let book = await booksData.getSingleAsAdmin(bookId);

    if (!book) {
      return {
        bookError: serviceErrors.RESOURCE_NOT_FOUND,
        book: null,
      };
    }

    if (isDeleted !== undefined) {
      book = await booksData.updateIsDeleted(bookId, isDeleted);
    }

    if (name) {
      book = await booksData.updateName(bookId, name);
    }

    if (image) {
      book = await booksData.updateImage(bookId, image);
    }

    if (description) {
      book = await booksData.updateDescription(bookId, description);
    }

    if (authorFirstName && authorLastName) {
      const authorId = await booksData.getAuthorId(
        authorFirstName,
        authorLastName,
      );
      book = await booksData.updateAuthor(bookId, authorId);
    }

    if (genre) {
      const genreId = await booksData.getGenreId(genre);
      book = await booksData.updateGenre(bookId, genreId);
    }

    if (statusId) {
      book = await booksData.updateStatusAsAdmin(bookId, statusId);
    }

    return {
      bookError: null,
      book: book,
    };
  };
};

/** Hides the given book from the users. */
const removeBook = (booksData) => {
  return async (bookId) => {
    const book = await booksData.getSingle(bookId);

    if (!book) {
      return {
        bookError: serviceErrors.RESOURCE_NOT_FOUND,
        book: null,
      };
    }

    const _ = await booksData.remove(bookId);

    return { bookError: null, book: book };
  };
};

export default {
  getBooks,
  getBookById,
  updateBookStatus,
  getBookAverageRate,
  rateBook,
  getAllBooksAsAdmin,
  getBookByIdAsAdmin,
  createBook,
  updateBook,
  removeBook,
};
