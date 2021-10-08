import express from 'express';
import userRoles from '../data/user-roles.js';
import { authMiddleware, roleMiddleware } from '../auth/auth-middleware.js';
import updateReviewAsAdminSchema from '../validators/update-review-as-admin.schema.js';
import createUpdateReviewSchema from '../validators/create-update-review.schema.js';
import bodyValidator from '../middlewares/body-validator.js';
import booksData from '../data/books-data.js';
import reviewsData from '../data/reviews-data.js';
import booksService from '../services/books-service.js';
import reviewsService from '../services/reviews-service.js';
import serviceErrors from '../services/service-errors.js';
import logoutMiddleware from '../middlewares/logout-middlware.js';
import usersService from '../services/users-service.js';

const adminReviewsController = express.Router();

adminReviewsController.use(
  authMiddleware,
  logoutMiddleware(usersService),
  roleMiddleware(usersService, userRoles.ADMIN),
);

/** Gets all the reviews for the given book. */
adminReviewsController.get('/:id/reviews', async (req, res) => {
  const { id } = req.params;

  const { bookError, book } = await booksService.getBookByIdAsAdmin(booksData)(
    id,
  );
  if (bookError === serviceErrors.RESOURCE_NOT_FOUND) {
    return res.status(404).send({ message: `There is no book with id ${id}!` });
  }

  const { reviewError, reviews } = await reviewsService.getAllByBookIdAsAdmin(
    reviewsData,
  )(id);
  if (reviewError === serviceErrors.RESOURCE_NOT_FOUND) {
    return res
      .status(404)
      .send({ warningMessage: `There are no reviews for book with id ${id}!` });
  }

  res.status(200).send({
    book: book,
    reviews: reviews,
  });
});

/** Adds a new review to the given book. */
adminReviewsController.post(
  '/:id/reviews',
  bodyValidator(createUpdateReviewSchema),
  async (req, res) => {
    const { id } = req.params;
    const { text } = req.body;
    const userId = req.user.id;

    const { book, bookError } = await booksService.getBookByIdAsAdmin(
      booksData,
    )(id);
    if (bookError === serviceErrors.RESOURCE_NOT_FOUND) {
      return res
        .status(404)
        .send({ message: `There is no book with id ${id}!` });
    }

    const { reviewError, review } = await reviewsService.createReview(
      reviewsData,
    )(id, userId, text);
    if (reviewError === serviceErrors.DUPLICATE_RESOURCE) {
      return res
        .status(409)
        .send({
          message: `You have already written a review for book with id ${id}!`,
        });
    }

    const reviewWithAdminData = await reviewsService.getSingleByIdAsAdmin(
      reviewsData,
    )(review.reviewId);

    res.status(201).send({
      successMessage: 'Successfully added the review!',
      book: book,
      review: reviewWithAdminData.review,
      text: text,
    });
  },
);

/** Updates the given review. */
adminReviewsController.put(
  '/:id/reviews/:reviewId',
  bodyValidator(updateReviewAsAdminSchema),
  async (req, res) => {
    const { text, isDeleted } = req.body;
    const { id, reviewId } = req.params;

    const { book, bookError } = await booksService.getBookByIdAsAdmin(
      booksData,
    )(id);
    if (bookError === serviceErrors.RESOURCE_NOT_FOUND) {
      return res
        .status(404)
        .send({ message: `There is no book with id ${id}!` });
    }

    const { reviewError, review } = await reviewsService.updateReviewAsAdmin(
      reviewsData,
    )(reviewId, text, isDeleted);
    if (reviewError === serviceErrors.RESOURCE_NOT_FOUND) {
      return res
        .status(404)
        .send({ message: `There is no review with id ${reviewId}!` });
    }
    if (reviewError === serviceErrors.BAD_REQUEST) {
      return res
        .status(409)
        .send({
          message: `The review with id ${reviewId} is already available!`,
        });
    }

    res.status(200).send({
      successMessage: `Successfully updated review with id ${reviewId}!`,
      book: book,
      review: review,
      text: req.body.text,
    });
  },
);

/** Deletes the given review. */
adminReviewsController.delete('/:id/reviews/:reviewId', async (req, res) => {
  const { id, reviewId } = req.params;

  const { book, bookError } = await booksService.getBookByIdAsAdmin(booksData)(
    id,
  );
  if (bookError === serviceErrors.RESOURCE_NOT_FOUND) {
    return res.status(404).send({ message: `There is no book with id ${id}!` });
  }

  const { reviewError, review } = await reviewsService.deleteReviewAsAdmin(
    reviewsData,
  )(reviewId);
  if (reviewError === serviceErrors.RESOURCE_NOT_FOUND) {
    return res
      .status(404)
      .send({ message: `There is no review with id ${reviewId}!` });
  }
  if (reviewError === serviceErrors.BAD_REQUEST) {
    return res
      .status(409)
      .send({ message: `The review with id ${reviewId} is already removed!` });
  }

  res.status(200).send({
    successMessage: `Successfully removed the review with id ${reviewId}!`,
    book: book,
    review: review,
  });
});
export default adminReviewsController;
