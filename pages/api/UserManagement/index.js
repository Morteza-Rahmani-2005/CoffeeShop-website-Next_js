import connectToDB from "@/utils/db";
import UserManagement from "@/models/usersManagement";
export default async function handler(req, res) {
  connectToDB();
  switch (req.method) {
    case "POST": {
      const { userNameId, email, password } = req.body;
      const existingUser = await UserManagement.findOne({
        $or: [{ userNameId: userNameId }, { email: email }],
      });

      if (existingUser) {
        res.json({ message: "User successfully registered." });
      } else {
        res
          .status(401)
          .json({ message: "The information entered is incorrect." });
        console.log("The information entered is incorrect.");
      }
    }
  }
}
