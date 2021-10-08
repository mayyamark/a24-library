import serviceErrors from './service-errors.js';
import banStatusData from '../data/ban-status-data.js';
import userRoles from '../data/user-roles.js';

/** Sets the user's ban status. */
const setUserBanStatus = (usersData) => {
  return async (userId, isBanned, description) => {
    const user = await usersData.getById(userId);
    if (user) {
      if (user.ban_status_id) {
        await banStatusData.setUserBanStatus(
          user.ban_status_id,
          isBanned,
          description,
        );
      } else {
        await banStatusData.createUserBanStatus(userId, isBanned, description);
      }

      return {
        error: null,
        bannedUser: {
          user: user.username,
          is_banned: isBanned,
          description: description,
        },
      };
    } else {
      return {
        error: serviceErrors.RESOURCE_NOT_FOUND,
        bannedUser: null,
      };
    }
  };
};

/** Deletes the user. */
const deleteUser = (usersData) => {
  return async (userId) => {
    const userToDelete = await usersData.getById(userId);
    if (!userToDelete) {
      return {
        error: serviceErrors.RESOURCE_NOT_FOUND,
        user: null,
      };
    } else {
      await usersData.deleteUser(userToDelete.user_id);
      return { error: null, user: userToDelete };
    }
  };
};

const allUsers = (usersData) => {
  return async () => {
    const allUsers = await usersData.getAllUsers();
    if (!allUsers) {
      return {
        error: serviceErrors.RESOURCE_NOT_FOUND,
        users: null,
      };
    }
    return { error: null, users: allUsers };
  };
};

const setUserRole = (usersData) => {
  return async (userId, role) => {
    const user = await usersData.getById(userId);
    if (user) {
      await usersData.updateUserRole(userId, role === userRoles.ADMIN);
      return {
        error: null,
        roleChangedUser: {
          user: user.username,
          admin: role,
        },
      };
    } else {
      return {
        error: serviceErrors.RESOURCE_NOT_FOUND,
        bannedUser: null,
      };
    }
  };
};
export default {
  setUserBanStatus,
  deleteUser,
  allUsers,
  setUserRole,
};
