import express from 'express';
import booksData from '../data/books-data.js';
import reviewsData from '../data/reviews-data.js';
import bodyValidator from '../middlewares/body-validator.js';
import createUpdateReviewSchema from '../validators/create-update-review.schema.js';
import updateReviewVoteSchema from '../validators/update-review-vote.schema.js';
import booksService from '../services/books-service.js';
import reviewsService from '../services/reviews-service.js';
import serviceErrors from '../services/service-errors.js';
import { authMiddleware, roleMiddleware } from './../auth/auth-middleware.js';
import logoutMiddleware from './../middlewares/logout-middlware.js';
import usersService from './../services/users-service.js';
import userBanStatusMiddleware from './../middlewares/user-ban-status-middlware.js';
import banStatusData from './../data/ban-status-data.js';
import userRoles from './../data/user-roles.js';

const reviewsController = express.Router();

reviewsController.use(
  authMiddleware,
  logoutMiddleware(usersService),
  roleMiddleware(usersService, userRoles.ADMIN, userRoles.USER),
  userBanStatusMiddleware(banStatusData),
);

/** Gets all of the not-deleted reviews for the given book. */
reviewsController.get('/:id/reviews', async (req, res) => {
  const { id } = req.params;

  const { bookError, book } = await booksService.getBookById(booksData)(id);
  if (bookError === serviceErrors.RESOURCE_NOT_FOUND) {
    return res.status(404).send({ message: `There is no book with id ${id}!` });
  }

  const { reviewError, reviews } = await reviewsService.getAllByBookId(
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
reviewsController.post(
  '/:id/reviews',
  bodyValidator(createUpdateReviewSchema),
  async (req, res) => {
    const { id } = req.params;
    const { text } = req.body;

    const { book, bookError } = await booksService.getBookById(booksData)(id);
    if (bookError === serviceErrors.RESOURCE_NOT_FOUND) {
      return res
        .status(404)
        .send({ message: `There is no book with id ${id}!` });
    }

    const { reviewError, review } = await reviewsService.createReview(
      reviewsData,
    )(id, req.user.id, text);
    if (reviewError === serviceErrors.DUPLICATE_RESOURCE) {
      return res
        .status(409)
        .send({
          message: `You have already written a review for book with id ${id}!`,
        });
    }

    res.status(201).send({
      successMessage: 'Successfully added the review!',
      book: book,
      review: review,
      text: text,
    });
  },
);

/** Updates the given review only if the author is the authorized user. */
reviewsController.put(
  '/:id/reviews/:reviewId',
  bodyValidator(createUpdateReviewSchema),
  async (req, res) => {
    const text = req.body.text;
    const reviewId = req.params.reviewId;

    const { error } = await reviewsService.updateReview(reviewsData)(
      req.user.id,
      reviewId,
      text,
    );
    if (error) {
      if (error === serviceErrors.RESOURCE_NOT_FOUND) {
        res
          .status(404)
          .send({ message: `Review doesn't exist id ${reviewId}!` });
      } else if (error === serviceErrors.OPERATION_NOT_PERMITTED) {
        res
          .status(403)
          .send({ message: `Not authorized to edit review ${reviewId}!` });
      } else {
        res.status(500).send({ message: 'Update review failed!' });
      }
    } else {
      res.status(202).send({ message: 'Review updated!', text: text });
    }
  },
);

/** Deletes the given review only if the author is the authorized user. */
reviewsController.delete('/:id/reviews/:reviewId', async (req, res) => {
  const reviewId = req.params.reviewId;

  const { error } = await reviewsService.deleteReview(reviewsData)(
    req.user.id,
    reviewId,
  );
  if (error) {
    if (error === serviceErrors.RESOURCE_NOT_FOUND) {
      res.status(404).send({ message: `Review doesn't exist id ${reviewId}!` });
    } else if (error === serviceErrors.OPERATION_NOT_PERMITTED) {
      res
        .status(403)
        .send({ message: `Not authorized to delete review ${reviewId}!` });
    } else {
      res.status(500).send({ message: 'Delete review failed!' });
    }
  } else {
    res.status(202).send({ message: 'Review deleted!' });
  }
});

/** Adds or updates the given review's vote only if the voter is not the author of the review. */
reviewsController.put(
  '/:id/reviews/:reviewId/votes',
  bodyValidator(updateReviewVoteSchema),
  async (req, res) => {
    const { id, reviewId } = req.params;

    const { book, bookError } = await booksService.getBookById(booksData)(id);
    if (bookError === serviceErrors.RESOURCE_NOT_FOUND) {
      return res
        .status(404)
        .send({ message: `There is no book with id ${id}!` });
    }

    const { review, reviewError } = await reviewsService.getSingleById(
      reviewsData,
    )(reviewId);
    if (reviewError === serviceErrors.RESOURCE_NOT_FOUND) {
      return res
        .status(404)
        .send({ message: `There is no review with id ${reviewId}!` });
    }
    const { votes, voteError } = await reviewsService.voteForReview(
      reviewsData,
    )(req.user.id, reviewId, req.body.vote);

    if (voteError === serviceErrors.BAD_REQUEST) {
      return res
        .status(400)
        .send({
          message: `There is no review with id ${reviewId} to vote to!`,
        });
    }
    if (voteError === serviceErrors.DUPLICATE_RESOURCE) {
      return res
        .status(409)
        .send({
          warningMessage: `You have already vote with ${req.body.vote} for review with id ${reviewId}!`,
        });
    }

    res.status(200).send({
      successMessage: `Successfully voted for review with id ${reviewId}!`,
      review: review,
      votes: votes,
      text: req.body.vote,
    });
  },
);

export default reviewsController;
