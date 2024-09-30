require("dotenv").config(); // This loads the .env file contents into process.env

module.exports = {
  development: {
    "username": process.env.MYSQL_USERNAME,
    "password": process.env.MYSQL_PASSWORD,
    "database": process.env.MYSQL_DATABASE,
    "host":     process.env.MYSQL_HOST,
    "dialect":  process.env.MYSQL
  },
  test: {
    "username": process.env.MYSQL_USERNAME,
    "password": process.env.MYSQL_PASSWORD,
    "database": process.env.MYSQL_DATABASE,
    "host":     process.env.MYSQL_HOST,
    "dialect":  process.env.MYSQL
  },
  production: {
    "username": process.env.MYSQL_USERNAME,
    "password": process.env.MYSQL_PASSWORD,
    "database": process.env.MYSQL_DATABASE,
    "host":     process.env.MYSQL_HOST,
    "dialect":  process.env.MYSQL
  }
};