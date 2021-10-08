const createUpdateReviewSchema = {
  text: (value) =>
    typeof value === 'string' && value.trim().length > 1 && value.length < 240,
};

export default createUpdateReviewSchema;
