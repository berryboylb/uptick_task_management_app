const dotenv = require("dotenv");
dotenv.config();

const constants = {
  MYSQL_USER: process.env.MYSQL_USER,
  MYSQL_SERVER: process.env.MYSQL_SERVER,
  MYSQL_PASSWORD: process.env.MYSQL_PASSWORD,
  MYSQL_DIALECT: process.env.MYSQL_DIALECT,
  MYSQL_DB: process.env.MYSQL_DB,
  APP_NAME: "EVENTS PLANNING APP",
  PORT: process.env.PORT || 5000,
  BASE_URL: `http://localhost/api/v1/${this.PORT}`,
  MONGOURI: process.env.MONGOURI,

  MESSAGES: {
    ALREADY_EXIST: "Resource already exists",
    ALREADY_VERIFIED: "User has already been verified",
    CREATED: "Resource created successfully",
    UPDATED: "Resource updated successfully",
    DELETED: "Resource deleted successfully",
    NOT_FOUND: "Not found",
    MISSING_FIELDS: "Please fill in the missing fields",
    INVALID_CREDENTIALS: "Invalid credentials",
    EVENT_CREATED: "New Event created successfully",
  },
};

module.exports = constants;
