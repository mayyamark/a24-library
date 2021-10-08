const updateBookAsFreeSchema = {
  status_id: (value) => value === '1' || value === 1,
};

export default updateBookAsFreeSchema;
