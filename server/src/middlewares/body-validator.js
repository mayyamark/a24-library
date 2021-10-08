const bodyValidator = (schema) => (req, res, next) => {
  const body = req.body;

  const isValid = Object.keys(schema)
    .map((prop) => schema[prop](body[prop]))
    .every((val) => val === true);

  if (!isValid) {
    return res.status(400).json({ message: 'Invalid body data!' });
  }

  next();
};

export default bodyValidator;
