import connectToDB from "@/utils/db";
import usersModel from "@/models/users";
import { isValidObjectId } from "mongoose";
export default async function handler(req, res) {
  connectToDB();
  switch (req.method) {
    case "GET": {
      const { id } = req.query;

      if (isValidObjectId(id)) {
        const user = await usersModel.find({ _id: id });

        res.json({ message: "User successfully displayed.", data: user });
      } else {
        res.json({ message: "The requested user was not found." });
      }
      break;
    }
    case "DELETE": {
      const { id } = req.query;

      const isDeleteUser = await usersModel.findByIdAndDelete({ _id: id });

      if (isDeleteUser) {
        res.json({ message: "User successfully deleted." });
      } else {
        res.json({ message: "Error deleting user" });
      }
    }
    case "PUT": {
      const { id } = req.query;

      const { userName, userNameId, email, password } = req.body;

      const updateUser = await usersModel.findByIdAndUpdate(
        { _id: id },
        { userName, userNameId, email, password },
      );

      if (updateUser) {
        res.json({ message: "User successfully updated." });
      } else {
        res.json({ message: "Error updating user information." });
      }
    }
  }
}
