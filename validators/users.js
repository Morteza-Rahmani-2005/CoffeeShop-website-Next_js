import Validator from "fastest-validator";

const validator = new Validator()

const schema = {
    userName: {
        type: "string",
        min: 3,
        max: 40,
        trim: true
    },
    userNameId: {
        type: "string",
        min: 3,
        max: 20,
        trim: true,
        pattern: /^[a-zA-Z0-9_]+$/,
    },
    email: {
        type: "email",
        normalize: true,
    },
    password: {
        type: "string",
        min: 8,
        max: 30
    },
    role: {
        type: "enum",
        values: ["USER", "ADMIN"],
        optional: true,
        default: "USER",
    },
    $$strict: true,
}

export const check = validator.compile(schema)


