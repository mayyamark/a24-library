const updateReviewAsAdminSchema = {
  text: (value) =>
    value === undefined ||
    (typeof value === 'string' &&
      value.trim().length > 1 &&
      value.length < 240),
  isDeleted: (value) => value === undefined || value === 0,
};

export default updateReviewAsAdminSchema;
