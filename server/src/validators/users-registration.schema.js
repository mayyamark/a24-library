const usersRegistrationSchema = {
  username: (value) =>
    typeof value === 'string' && value && value.length > 1 && value.length < 25,
  password: (value) =>
    typeof value === 'string' && value && value.length > 1 && value.length < 75,
};

export default usersRegistrationSchema;
