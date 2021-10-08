import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import passport from 'passport';
import jwtStrategy from './auth/strategy.js';
import { PORT } from './config.js';
import booksController from './controllers/books-controller.js';
import reviewsController from './controllers/reviews-controller.js';
import usersController from './controllers/users-controller.js';
import adminBooksController from './controllers/admin-books-controller.js';
import adminReviewsController from './controllers/admin-reviews-controller.js';
import adminUsersController from './controllers/admin-users-controller.js';

passport.use(jwtStrategy);

const app = express();

app.use(cors());
app.use(passport.initialize());
app.use(bodyParser.json());
app.use(helmet());

app.use('/api/users', usersController);
booksController.use(reviewsController);
app.use('/api/books', booksController);
app.use('/api/admin/users', adminUsersController);
app.use('/api/admin/books', adminBooksController);
adminBooksController.use(adminReviewsController);
app.use((err, req, res, next) =>
  res.status(500).send({ message: 'An unexpected error occurred!' }),
);

app.all('*', (req, res) =>
  res.status(404).send({ message: 'Resource not found!' }),
);

app.listen(PORT, () =>
  console.log(`Listening for library requests on port ${PORT}!`),
);
