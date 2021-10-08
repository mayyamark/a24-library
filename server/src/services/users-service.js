import serviceErrors from './service-errors.js';
import usersData from '../data/users-data.js';
import userRoles from '../data/user-roles.js';
import bcrypt from 'bcrypt';
import tokenBlacklistData from '../user-logout-data/token-blacklist-data.js';

/** Authorizes the user. */
const getRegisteredUser = async (username, password) => {
  const user = await usersData.getByUsername(username);
  if (user && (await bcrypt.compare(password, user.password))) {
    return { error: null, user: user };
  }
  return {
    error: serviceErrors.RESOURCE_NOT_FOUND,
    user: null,
  };
};

const getUserWithRole = async (userId, role) => {
  const user = await usersData.getById(userId);
  if (user) {
    const userRole = user.is_admin ? userRoles.ADMIN : userRoles.USER;
    return role === userRole;
  }
  return false;
};

/** Registers a new user. */
const registerUser = async (username, password, is_admin = false) => {
  if (await usersData.getByUsername(username)) {
    return {
      error: serviceErrors.DUPLICATE_RESOURCE,
      user: null,
    };
  }
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await usersData.createUser(username, passwordHash, is_admin);
  return { error: null, user: user };
};

/** Logs out the user. */
const unregisterUser = async (authorization) => {
  const { token } = await checkUserLoggedOut(authorization);
  if (token) {
    await tokenBlacklistData.setTokenBlacklisted(token);
  }
};

/** Checks if the user is logged out. */
const checkUserLoggedOut = async (authorization) => {
  if (authorization && authorization.includes('Bearer')) {
    const token = authorization.split(' ')[1];
    if (await tokenBlacklistData.checkTokenBlacklisted(token)) {
      return { token: token, error: serviceErrors.USER_LOGGED_OUT };
    }
    return { token: token, error: null };
  }
  return { token: null, error: serviceErrors.BAD_REQUEST };
};

export default {
  registerUser,
  getRegisteredUser,
  unregisterUser,
  checkUserLoggedOut,
  getUserWithRole,
};
