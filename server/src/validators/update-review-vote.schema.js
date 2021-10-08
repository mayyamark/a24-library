const updateReviewVoteSchema = {
  vote: (value) => value === 'like' || value === 'dislike',
};

export default updateReviewVoteSchema;
