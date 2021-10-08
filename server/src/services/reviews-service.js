import serviceErrors from './service-errors.js';

/** Gets all of the not-deleted reviews for the given book. */
const getAllByBookId = (reviewsData) => {
  return async (bookId) => {
    const reviews = await reviewsData.getAllForBook(bookId);

    if (!reviews[0]) {
      return {
        reviewError: serviceErrors.RESOURCE_NOT_FOUND,
        reviews: null,
      };
    }
    const votes = await Promise.all(
      reviews.map(async (r) => await reviewsData.getAllVotes(r.reviewId)),
    );

    const reviewsWithVotes = await reviews.map(
      (el, index) => (el = { ...reviews[index], ...votes[index] }),
    );

    return { reviewError: null, reviews: reviewsWithVotes };
  };
};

/** Gets a single review by its id. */
const getSingleById = (reviewsData) => {
  return async (reviewId) => {
    const review = await reviewsData.getById(reviewId);
    if (!review) {
      return {
        reviewError: serviceErrors.RESOURCE_NOT_FOUND,
        review: null,
      };
    }

    return { reviewError: null, review: review };
  };
};

/** Adds a new review to the given book. */
const createReview = (reviewsData) => {
  return async (bookId, userId, text) => {
    const exsistingReview = await reviewsData.getSingleByGivenBookAndUser(
      bookId,
      userId,
    );

    if (exsistingReview) {
      return {
        reviewError: serviceErrors.DUPLICATE_RESOURCE,
        review: null,
      };
    }

    const newReview = await reviewsData.create(bookId, userId, text);

    return {
      reviewError: null,
      review: newReview,
    };
  };
};

/** Updates the given review only if the author is the authorized user. */
const updateReview = (reviewsData) => {
  return async (userId, reviewId, content) => {
    const review = await reviewsData.getById(reviewId);
    if (!review) {
      return {
        error: serviceErrors.RESOURCE_NOT_FOUND,
      };
    } else if (review.user_id !== userId) {
      return {
        error: serviceErrors.OPERATION_NOT_PERMITTED,
      };
    } else {
      await reviewsData.updateById(reviewId, content);
      return {
        error: null,
      };
    }
  };
};

/** Deletes the given review only if the author is the authorized user. */
const deleteReview = (reviewsData) => {
  return async (userId, reviewId) => {
    const review = await reviewsData.getById(reviewId);
    if (!review) {
      return {
        error: serviceErrors.RESOURCE_NOT_FOUND,
      };
    } else if (review.user_id !== userId) {
      return {
        error: serviceErrors.OPERATION_NOT_PERMITTED,
      };
    } else {
      await reviewsData.deleteById(reviewId);
      return {
        error: null,
      };
    }
  };
};

/** Adds or updates the given review's vote only if the voter is not the author of the review. */
const voteForReview = (reviewsData) => {
  return async (userId, reviewId, vote) => {
    const review = await reviewsData.getById(reviewId);

    if (!review) {
      return {
        voteError: serviceErrors.RESOURCE_NOT_FOUND,
        vote: null,
      };
    }
    if (review.user_id === userId) {
      return {
        voteError: serviceErrors.BAD_REQUEST,
        vote: null,
      };
    }
    const exsistingVote = await reviewsData.getSingleVote(reviewId, userId);
    if (exsistingVote) {
      if (exsistingVote.vote === vote) {
        return {
          voteError: serviceErrors.DUPLICATE_RESOURCE,
          vote: null,
        };
      } else {
        const updated = await reviewsData.updateVote(
          exsistingVote.id,
          reviewId,
          vote,
        );
        return {
          voteError: null,
          votes: await reviewsData.getAllVotes(reviewId),
        };
      }
    } else {
      const created = await reviewsData.createVote(reviewId, userId, vote);
      return {
        voteError: null,
        votes: await reviewsData.getAllVotes(reviewId),
      };
    }
  };
};

/** Gets a single review by its id. */
const getSingleByIdAsAdmin = (reviewsData) => {
  return async (reviewId) => {
    const review = await reviewsData.getByIdAsAdmin(reviewId);
    if (!review) {
      return {
        reviewError: serviceErrors.RESOURCE_NOT_FOUND,
        review: null,
      };
    }

    return { reviewError: null, review: review };
  };
};

/** Gets all the reviews for the given book. */
const getAllByBookIdAsAdmin = (reviewsData) => {
  return async (bookId) => {
    const reviews = await reviewsData.getAllForBookAsAdmin(+bookId);

    if (!reviews[0]) {
      return {
        reviewError: serviceErrors.RESOURCE_NOT_FOUND,
        reviews: null,
      };
    }
    const votes = await Promise.all(
      reviews.map(async (r) => await reviewsData.getAllVotes(r.reviewId)),
    );

    const reviewsWithVotes = await reviews.map(
      (el, index) => (el = { ...reviews[index], ...votes[index] }),
    );

    return { reviewError: null, reviews: reviewsWithVotes };
  };
};

/** Updates the given review. */
const updateReviewAsAdmin = (reviewsData) => {
  return async (reviewId, text, isDeleted) => {
    let review = await reviewsData.getById(reviewId);

    if (!review) {
      return {
        reviewError: serviceErrors.RESOURCE_NOT_FOUND,
        review: null,
      };
    }

    if (isDeleted !== undefined) {
      if (review.is_deleted === isDeleted) {
        return {
          reviewError: serviceErrors.BAD_REQUEST,
          review: null,
        };
      } else {
        review = await reviewsData.updateIsDeletedAsAdmin(reviewId, isDeleted);
      }
    }

    if (text) {
      review = await reviewsData.updateTextAsAdmin(reviewId, text);
    }
    return {
      reviewError: null,
      review: review,
    };
  };
};

/** Deletes the given review. */
const deleteReviewAsAdmin = (reviewsData) => {
  return async (reviewId) => {
    const reviewToDelete = await reviewsData.getById(reviewId);

    if (!reviewToDelete) {
      return {
        reviewError: serviceErrors.RESOURCE_NOT_FOUND,
        review: null,
      };
    }

    if (reviewToDelete.is_deleted === 1) {
      return {
        reviewError: serviceErrors.BAD_REQUEST,
        review: null,
      };
    }

    const review = await reviewsData.updateIsDeletedAsAdmin(reviewId, 1);
    return {
      reviewError: null,
      review: review,
    };
  };
};

/** Get all reviews for a given user. */
const getAllByUserId = (reviewsData) => {
  return async (userId) => {
    const reviews = await reviewsData.getAllReviewsForUser(userId);

    if (!reviews) {
      return {
        reviewError: serviceErrors.RESOURCE_NOT_FOUND,
        reviews: null,
      };
    }

    return { reviewError: null, reviews: reviews };
  };
};

export default {
  getAllByBookId,
  getSingleById,
  createReview,
  updateReview,
  deleteReview,
  voteForReview,
  getSingleByIdAsAdmin,
  getAllByBookIdAsAdmin,
  updateReviewAsAdmin,
  deleteReviewAsAdmin,
  getAllByUserId,
};
