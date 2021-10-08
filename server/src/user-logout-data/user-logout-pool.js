import mariadb from 'mariadb';
import { USER_LOGOUT_DB_CONFIG } from '../config.js';

const userLogoutPool = mariadb.createPool(USER_LOGOUT_DB_CONFIG);

export default userLogoutPool;
