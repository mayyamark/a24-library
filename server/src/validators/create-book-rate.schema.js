const createBookRateSchema = {
  rate: (value) => value >= 1 && value <= 5,
};

export default createBookRateSchema;
