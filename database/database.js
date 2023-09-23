const { MONGOURI } = require("../src/config/constants");

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    //connect to db
    await mongoose.connect(MONGOURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected...");
  } catch (err) {
    console.log(err.message);
    //kill the application running
    process.exit(1);
  }
};

module.exports = connectDB;
