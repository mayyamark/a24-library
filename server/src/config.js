export const DB_CONFIG = {
  host: process.env.DB_HOST,
  port: '3306',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: 'library',
};

export const USER_LOGOUT_DB_CONFIG = {
  host: process.env.DB_HOST,
  port: '3306',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: 'user_logout_db',
};

export const PORT = 5000;

export const PRIVATE_KEY = 'sekreten_chasten_klu4';

export const TOKEN_LIFETIME = 60 * 60;

export const DEFAULT_USER_ROLE = 'User';
