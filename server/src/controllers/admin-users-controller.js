import express from 'express';
import userRoles from './../data/user-roles.js';
import { authMiddleware, roleMiddleware } from './../auth/auth-middleware.js';
import userBanSchema from './../validators/user-ban.schema.js';
import userRoleSchema from './../validators/user-role.schema.js';
import bodyValidator from './../middlewares/body-validator.js';
import adminUsersService from './../services/admin-users-service.js';
import serviceErrors from './../services/service-errors.js';
import logoutMiddleware from './../middlewares/logout-middlware.js';
import usersService from './../services/users-service.js';
import usersData from '../data/users-data.js';

const adminUsersController = express.Router();

adminUsersController.use(
  authMiddleware,
  logoutMiddleware(usersService),
  roleMiddleware(usersService, userRoles.ADMIN),
);

/** Bans the given user. */
adminUsersController.post(
  '/:id/banstatus',
  bodyValidator(userBanSchema),
  async (req, res) => {
    const id = req.params.id;
    const isBanned = req.body.is_banned;
    const description = req.body.description;

    const result = await adminUsersService.setUserBanStatus(usersData)(
      id,
      isBanned,
      description,
    );

    if (result.error) {
      if (result.error === serviceErrors.RESOURCE_NOT_FOUND) {
        res.status(404).send(`User ${id} not found`);
      }
    } else {
      res.status(200).send(result.bannedUser);
    }
  },
);

adminUsersController.post(
  '/:id/role',
  bodyValidator(userRoleSchema),
  async (req, res) => {
    const id = req.params.id;
    const role = req.body.role;
    const result = await adminUsersService.setUserRole(usersData)(id, role);

    if (result.error) {
      if (result.error === serviceErrors.RESOURCE_NOT_FOUND) {
        res.status(404).send(`User ${id} not found`);
      }
    } else {
      res.status(200).send(result.bannedUser);
    }
  },
);

/** Deletes the given user. */
adminUsersController.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const { error, user } = await adminUsersService.deleteUser(usersData)(id);

  if (error === serviceErrors.RESOURCE_NOT_FOUND) {
    res.status(404).send({ message: 'User not found!' });
  } else {
    res.status(200).send({ user: user, message: 'deleted successfully!' });
  }
});

adminUsersController.get('', async (req, res) => {
  const { error, users } = await adminUsersService.allUsers(usersData)();

  if (error === serviceErrors.RESOURCE_NOT_FOUND) {
    res.status(404).send({ message: 'No users found!' });
  } else {
    res.status(200).send({ users: users });
  }
});

export default adminUsersController;
