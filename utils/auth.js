import { hash } from "bcrypt"



export const hashedPassword = async (password) => {
    const hashPassword = await hash(password, 12)
    return hashPassword
}