import passport from 'passport';

const authMiddleware = passport.authenticate('jwt', { session: false });

const roleMiddleware = (usersService, ...roleNames) => {
  return async (req, res, next) => {
    let noSuchUser = true;

    if (req.user) {
      for (const roleName of roleNames) {
        if (await usersService.getUserWithRole(req.user.id, roleName)) {
          next();
          noSuchUser = false;
          break;
        }
      }
    }

    if (noSuchUser) {
      res.status(403).send({
        message: 'Resource is forbidden.',
      });
    }
  };
};

export { authMiddleware, roleMiddleware };
