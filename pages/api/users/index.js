import connectToDB from "@/utils/db";
import usersModel from "@/models/users";
export default async function handler(req, res) {
  connectToDB();
  switch (req.method) {
    case "GET": {
      const users = await usersModel.find();

      res.json({ message: "Users successfully displayed.", data: users });
      break;
    }
    case "POST": {
      const { userName, userNameId, email, password } = req.body;
      const existingUser = await usersModel.findOne({
        $or: [{ email: email }, { userNameId: userNameId }],
      });

      if (existingUser) {
        res
          .status(406)
          .json({ message: "Email and password have already been used." });
      } else {
        const user = await usersModel.create({
          userName,
          userNameId,
          email,
          password,
        });
        res.status(201).json({ message: "User successfully registered." });
      }

      break;
    }
  }
}
