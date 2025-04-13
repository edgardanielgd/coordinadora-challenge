require('dotenv').config();

module.exports = {
  dev: {
    driver: 'mysql',
    host: process.env.DB_HOST || '',
    port: process.env.DB_PORT ? parseInt( process.env.DB_PORT ) : 3306,
    user: process.env.DB_USER || '',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_DATABASE || '',
  },
};