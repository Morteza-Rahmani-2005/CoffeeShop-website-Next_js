import mongoose from "mongoose";

const schema = mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  userNameId: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
  },
});

const model = mongoose.models.User || mongoose.model("User", schema);

export default model;
