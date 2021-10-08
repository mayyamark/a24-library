import serviceErrors from './../services/service-errors.js';

const logoutMiddleware = (usersService) => async (req, res, next) => {
  const result = await usersService.checkUserLoggedOut(
    req.headers.authorization,
  );
  if (result.error) {
    if (result.error === serviceErrors.USER_LOGGED_OUT) {
      return res.status(403).json({ message: 'user logged out' });
    } else if (result.error === serviceErrors.BAD_REQUEST) {
      return res.status(403).json({ message: 'invalid request!' });
    }
  }
  next();
};

export default logoutMiddleware;
