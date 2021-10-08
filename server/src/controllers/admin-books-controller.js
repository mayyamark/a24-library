import express from 'express';
import userRoles from '../data/user-roles.js';
import { authMiddleware, roleMiddleware } from '../auth/auth-middleware.js';
import createBookSchema from '../validators/create-book.schema.js';
import updateBookSchema from '../validators/update-book.schema.js';
import bodyValidator from '../middlewares/body-validator.js';
import booksData from '../data/books-data.js';
import bookRatesData from '../data/book-rates-data.js';
import booksService from '../services/books-service.js';
import serviceErrors from '../services/service-errors.js';
import logoutMiddleware from '../middlewares/logout-middlware.js';
import usersService from '../services/users-service.js';
import banStatusData from './../data/ban-status-data.js';
import userBanStatusMiddleware from './../middlewares/user-ban-status-middlware.js';

const adminBooksController = express.Router();

adminBooksController.use(
  authMiddleware,
  logoutMiddleware(usersService),
  roleMiddleware(usersService, userRoles.ADMIN),
  userBanStatusMiddleware(banStatusData),
);

/** Gets all books with optional query parameters. */
adminBooksController.get('/', async (req, res) => {
  const { name, author, genre, page, limit } = req.query;

  if (!page || page !== page || page < 1) {
    res.status(400).send({ message: 'Invalid page number!' });
  }

  const books = await booksService.getAllBooksAsAdmin(booksData)(
    name,
    author,
    genre,
    +page,
    +limit,
  );
  res.status(200).send(books);
});

/** Gets a single book by its id. */
adminBooksController.get('/:id', async (req, res) => {
  const { id } = req.params;
  const { bookError, book } = await booksService.getBookByIdAsAdmin(booksData)(
    id,
  );

  if (bookError === serviceErrors.RESOURCE_NOT_FOUND) {
    return res.status(404).send({ message: `There is no book with id ${id}!` });
  }

  const averageRate = await booksService.getBookAverageRate(bookRatesData)(id);

  const bookWithRate = { ...book, averageRate };

  res.status(200).send(bookWithRate);
});

/** Creates a new book. */
adminBooksController.post(
  '/',
  bodyValidator(createBookSchema),
  async (req, res) => {
    const {
      name,
      image,
      description,
      authorFirstName,
      authorLastName,
      genre,
      status_id,
    } = req.body;

    const { bookError, book } = await booksService.createBook(booksData)(
      name,
      image,
      description,
      authorFirstName,
      authorLastName,
      genre,
      status_id,
    );

    if (bookError === serviceErrors.DUPLICATE_RESOURCE) {
      return res
        .status(409)
        .send({ message: `Book with name ${name} exsists already!` });
    }

    res.status(201).send({
      successMessage: `Successfully created book ${name}!`,
      book: book,
    });
  },
);

/** Updates the given book's data. */
adminBooksController.put(
  '/:id',
  bodyValidator(updateBookSchema),
  async (req, res) => {
    const { id } = req.params;
    const {
      name,
      image,
      description,
      authorFirstName,
      authorLastName,
      genre,
      status_id,
      isDeleted,
    } = req.body;

    const { bookError, book } = await booksService.updateBook(booksData)(
      id,
      name,
      image,
      description,
      authorFirstName,
      authorLastName,
      genre,
      status_id,
      isDeleted,
    );
    if (bookError === serviceErrors.RESOURCE_NOT_FOUND) {
      return res
        .status(404)
        .send({ message: `There is no book with id ${id} to update!` });
    }

    res.status(200).send({
      successMessage: `Successfully updated book with id ${id}!`,
      book: book,
      updateData: req.body,
    });
  },
);

/** Hides the given book from the users. */
adminBooksController.delete('/:id', async (req, res) => {
  const { id } = req.params;

  const { bookError, book } = await booksService.removeBook(booksData)(id);

  if (bookError === serviceErrors.RESOURCE_NOT_FOUND) {
    return res
      .status(404)
      .send({ message: `There is no book with id ${id} to remove!` });
  }

  res.status(200).send({
    successMessage: `Successfully removed book with id ${id}!`,
    book: book,
  });
});
export default adminBooksController;
