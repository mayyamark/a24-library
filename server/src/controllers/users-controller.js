import express from 'express';
import createToken from './../auth/create-token.js';
import { authMiddleware, roleMiddleware } from './../auth/auth-middleware.js';
import usersService from '../services/users-service.js';
import reviewsService from '../services/reviews-service.js';
import serviceErrors from '../services/service-errors.js';
import usersRegistrationSchema from '../validators/users-registration.schema.js';
import bodyValidator from '../middlewares/body-validator.js';
import logoutMiddleware from './../middlewares/logout-middlware.js';
import userRoles from '../data/user-roles.js';
import reviewsData from '../data/reviews-data.js';

const usersController = express.Router();

/** Registers a new user. */
usersController.post(
  '/',
  bodyValidator(usersRegistrationSchema),
  async (req, res) => {
    const result = await usersService.registerUser(
      req.body.username,
      req.body.password,
    );

    if (result.error) {
      if (result.error === serviceErrors.DUPLICATE_RESOURCE) {
        res
          .status(409)
          .send({ message: `${req.body.username} already exists` });
      } else {
        res.status(400).send({ message: 'user registraion failed' });
      }
    } else {
      const payload = {
        sub: result.user.id,
        username: result.user.username,
        // TODO: register still doesn't have the capability to create admins
        // so hardcoding role to user
        role: userRoles.USER,
      };
      const token = createToken(payload);
      res.status(201).send({
        token: token,
      });
    }
  },
);

/** Logs in the user. */
usersController.post(
  '/login',
  bodyValidator(usersRegistrationSchema),
  async (req, res) => {
    const result = await usersService.getRegisteredUser(
      req.body.username,
      req.body.password,
    );
    if (result.error) {
      if (result.error === serviceErrors.RESOURCE_NOT_FOUND) {
        res.status(401).send({ message: 'username and password do not match' });
      } else {
        res.status(400).send({ message: 'user login failed' });
      }
    } else {
      const payload = {
        sub: result.user.user_id,
        username: result.user.username,
        role: result.user.is_admin ? userRoles.ADMIN : userRoles.USER,
      };
      const token = createToken(payload);

      res.status(200).send({
        token: token,
      });
    }
  },
);

/** Logs out the user. */
usersController.post(
  '/logout',
  authMiddleware,
  logoutMiddleware(usersService),
  roleMiddleware(usersService, userRoles.ADMIN, userRoles.USER),
  async (req, res) => {
    await usersService.unregisterUser(req.headers.authorization);
    return res.status(202).json({ message: 'logged out' });
  },
);

/** Gets all the reviews by this user */
usersController.get(
  '/reviews',
  authMiddleware,
  logoutMiddleware(usersService),
  roleMiddleware(usersService, userRoles.ADMIN, userRoles.USER),
  async (req, res) => {
    const userId = req.user.id;
    const { reviewError, reviews } = await reviewsService.getAllByUserId(
      reviewsData,
    )(userId);

    if (reviewError === serviceErrors.RESOURCE_NOT_FOUND) {
      return res
        .status(404)
        .send({
          warningMessage: `There are no reviews for user id ${userId}!`,
        });
    }

    res.status(200).send({
      reviews: reviews,
    });
  },
);

export default usersController;
