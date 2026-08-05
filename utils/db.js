const mongoose = require("mongoose");

const connectToDB = async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      return false;
    }
    await mongoose.connect("mongodb://127.0.0.1:27017/test");
    console.log("Connected!");
  } catch (err) {
    console.log("Connected", err);
  }
};

export default connectToDB;
