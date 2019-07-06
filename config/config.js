require('dotenv').config();

const env = process.env.NODE_ENV || 'dev';

const dev = {
  app: {
    portNumber: parseInt(process.env.DEV_APP_PORT) || 5000
  },
  db: {
    host: process.env.DEV_DB_HOST || 'localhost',
    user: process.env.DEV_DB_USER || '<your username>',
    password: process.env.DEV_DB_PASSWORD || '<your password>',
    database: process.env.DEV_DB_NAME || 'helpdesk',
    port: parseInt(process.env.DEV_DB_PORT) || 3306
  },
  redis: {
    port: process.env.DEV_REDIS_PORT || 6379,
    host: process.env.DEV_REDIS_HOST || "127.0.0.1",
    password: process.env.DEV_REDIS_PASSWORD
  },
  secret: process.env.DEV_SECRET_KEY
};

const test = {
};

const config = {
  dev,
  test
}

module.exports = config[env];