const updateBookSchema = {
  name: (value) =>
    value === undefined ||
    (value && typeof value === 'string' && value.trim().length > 1),
  image: (value) =>
    value === undefined ||
    (value && typeof value === 'string' && value.trim().length > 1),
  description: (value) =>
    value === undefined ||
    (value && typeof value === 'string' && value.trim().length > 1),
  authorFirstName: (value) =>
    value === undefined ||
    (value && typeof value === 'string' && value.trim().length > 1),
  authorLastName: (value) =>
    value === undefined ||
    (value && typeof value === 'string' && value.trim().length > 1),
  genre: (value) =>
    value === undefined ||
    (value && typeof value === 'string' && value.trim().length > 1),
  status_id: (value) =>
    value === undefined ||
    value === '1' ||
    value === '2' ||
    value === '3' ||
    value === 1 ||
    value === 2 ||
    value === 3,
  isDeleted: (value) =>
    value === undefined ||
    value === '1' ||
    value === 1 ||
    value === '0' ||
    value === 0,
};

export default updateBookSchema;
