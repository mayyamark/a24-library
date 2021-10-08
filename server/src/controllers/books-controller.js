import express from 'express';
import bodyValidator from '../middlewares/body-validator.js';
import updateBookAsBorrowedSchema from '../validators/update-book-as-borrowed.schema.js';
import updateBookAsFreeSchema from '../validators/update-book-as-free.schema.js';
import createBookRateSchema from '../validators/create-book-rate.schema.js';
import booksData from '../data/books-data.js';
import historyData from '../data/history-data.js';
import bookRatesData from '../data/book-rates-data.js';
import serviceErrors from '../services/service-errors.js';
import booksService from '../services/books-service.js';
import historyService from '../services/history-service.js';
import { authMiddleware, roleMiddleware } from './../auth/auth-middleware.js';
import userBanStatusMiddleware from './../middlewares/user-ban-status-middlware.js';
import logoutMiddleware from './../middlewares/logout-middlware.js';
import usersService from './../services/users-service.js';
import banStatusData from './../data/ban-status-data.js';
import userRoles from './../data/user-roles.js';

const booksController = express.Router();

booksController.use(
  authMiddleware,
  logoutMiddleware(usersService),
  roleMiddleware(usersService, userRoles.ADMIN, userRoles.USER),
  userBanStatusMiddleware(banStatusData),
);

/** Gets all of the not-hidden books with optional query parameters. */
booksController.get('/', async (req, res) => {
  const { name, author, genre, page, limit } = req.query;

  if (!page || page !== page || page < 1) {
    res.status(400).send({ message: 'Invalid page number!' });
  }

  const books = await booksService.getBooks(booksData)(
    name,
    author,
    genre,
    +page,
    +limit,
  );
  res.status(200).send(books);
});

/** Gets the history for the given user. */
booksController.get('/history', async (req, res) => {
  const userId = req.user.id;

  const { historyError, history } = await historyService.getHistoryByUserId(
    historyData,
  )(userId);
  if (historyError === serviceErrors.RESOURCE_NOT_FOUND) {
    return res
      .status(404)
      .send({ warningMessage: 'There is no activity yet!' });
  }

  res.status(200).send(history);
});

/** Gets a single not-hidden book by its id. */
booksController.get('/:id', async (req, res) => {
  const { id } = req.params;

  const { bookError, book } = await booksService.getBookById(
    booksData,
    bookRatesData,
  )(id);
  if (bookError === serviceErrors.RESOURCE_NOT_FOUND) {
    return res.status(404).send({ message: `There is no book with id ${id}!` });
  }

  const averageRate = await booksService.getBookAverageRate(bookRatesData)(id);

  const bookWithRate = { ...book, averageRate };

  res.status(200).send(bookWithRate);
});

/** Updates the book's status to 'borrowed' and logs that update into the history. */
booksController.put(
  '/:id',
  bodyValidator(updateBookAsBorrowedSchema),
  async (req, res) => {
    const { id } = req.params;
    const { status_id } = req.body;
    const userId = req.user.id;

    const { book, bookError } = await booksService.updateBookStatus(booksData)(
      id,
      status_id,
      'borrowed',
    );
    if (bookError === serviceErrors.RESOURCE_NOT_FOUND) {
      return res
        .status(404)
        .send({ message: `There is no book with id ${id}!` });
    }
    if (bookError === serviceErrors.BAD_REQUEST) {
      return res
        .status(400)
        .send({ message: `The book with id ${id} is already borrowed!` });
    }

    const borrowDate = await historyService.logHistoryBorrowing(historyData)(
      userId,
      id,
    );

    res.status(200).send({
      successMessage: `Successfully borrowed book with id ${id}!`,
      book: book,
      borrowDate: borrowDate,
    });
  },
);

/** Updates the book's status to 'free' and logs that update into the history. */
booksController.delete(
  '/:id',
  bodyValidator(updateBookAsFreeSchema),
  async (req, res) => {
    const { id } = req.params;
    const { status_id } = req.body;
    const userId = req.user.id;

    const { book, bookError } = await booksService.updateBookStatus(booksData)(
      id,
      status_id,
      'free',
    );
    if (bookError === serviceErrors.RESOURCE_NOT_FOUND) {
      return res
        .status(404)
        .send({ message: `There is no book with id ${id}!` });
    }
    if (bookError === serviceErrors.BAD_REQUEST) {
      return res
        .status(400)
        .send({ message: `The book with id ${id} is already returned!` });
    }

    const returnInfo = await historyService.logHistoryReturning(historyData)(
      userId,
      id,
    );

    res.status(200).send({
      successMessage: `Successfully returned book with id ${id}!`,
      book: book,
      returnInfo: returnInfo,
    });
  },
);

/** Adds a new rate for the book. */
booksController.post(
  '/:id/rate',
  bodyValidator(createBookRateSchema),
  async (req, res) => {
    const { id } = req.params;
    const { rate } = req.body;
    const userId = req.user.id;

    const { bookError, book } = await booksService.getBookById(booksData)(id);
    if (bookError === serviceErrors.RESOURCE_NOT_FOUND) {
      return res
        .status(404)
        .send({ message: `There is no book with id ${id}!` });
    }

    const { rateError, averageRate } = await booksService.rateBook(
      bookRatesData,
    )(userId, id, rate);
    if (rateError === serviceErrors.RESOURCE_NOT_FOUND) {
      return res
        .status(400)
        .send({
          warningMessage: `You must read the book with id ${id} first!`,
        });
    }
    if (rateError === serviceErrors.BAD_REQUEST) {
      return res
        .status(400)
        .send({
          warningMessage: `You must write a review for book with id ${id} first!`,
        });
    }

    res.status(200).send({
      book: book,
      averageRate: averageRate,
      newRate: rate,
    });
  },
);

export default booksController;
