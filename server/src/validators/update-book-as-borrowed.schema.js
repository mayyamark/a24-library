const updateBookAsBorrowedSchema = {
  status_id: (value) => value === '2' || value === 2,
};

export default updateBookAsBorrowedSchema;
