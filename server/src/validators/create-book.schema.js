const createBookSchema = {
  name: (value) =>
    value && typeof value === 'string' && value.trim().length > 1,
  image: (value) =>
    value && typeof value === 'string' && value.trim().length > 1,
  description: (value) =>
    value && typeof value === 'string' && value.trim().length > 1,
  authorFirstName: (value) =>
    value && typeof value === 'string' && value.trim().length > 1,
  authorLastName: (value) =>
    value && typeof value === 'string' && value.trim().length > 1,
  genre: (value) =>
    value && typeof value === 'string' && value.trim().length > 1,
  status_id: (value) => value >= 1 && value <= 3,
};

export default createBookSchema;
