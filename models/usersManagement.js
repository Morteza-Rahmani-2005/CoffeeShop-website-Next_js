import mongoose from "mongoose";

const schema = mongoose.Schema({
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

const model =
  mongoose.models.UserManagement || mongoose.model("UserManagement", schema);

export default model;
