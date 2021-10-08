const userBanSchema = {
  is_banned: (value) => typeof value === 'boolean',
  description: (value) =>
    typeof value === 'string' && value && value.length > 1 && value.length < 75,
};

export default userBanSchema;
