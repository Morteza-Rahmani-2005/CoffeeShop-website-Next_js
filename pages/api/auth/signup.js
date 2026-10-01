import connectToDB from "@/utils/db";
import UserModel from "@/models/users"
import { check } from "@/validators/users";
import { hashedPassword } from "@/utils/auth";


export default async function handler(req, res) {
    await connectToDB();

    switch (req.method) {
        case "POST": {
            const { userName, userNameId, email, password } = req.body;
            console.log(userName, userNameId, email, password)

            const validationResult = check(req.body)

            if (!validationResult) {
                res.status(422).json({ message: "The submitted information is invalid." })
            }


            const existingUser = await UserModel.findOne({
                $or: [{ userNameId: userNameId }, { email: email }]
            }).select("_id")

            if (existingUser) {
                return res.status(409).json({
                    message: "A user with this username or email already exists."
                });
            }

            const hashPassword = await hashedPassword(password)


            await UserModel.create({ userName, userNameId, email, password: hashPassword, role: "USER" })

            res.status(201).json({ message: "user Cearted soccessfully:))" })


        }
    }

}