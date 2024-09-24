

import jwt from "jsonwebtoken"
import { AppError } from "./catchAsyncError.js";

export const generateToken = (user) => {
    const { email, userName, role, status, _id } = user;

    return jwt.sign({ email, userName, role, status, _id },
        process.env.SECRET_KEY)
}

export const verifiyToken = async (token) => {
    let userPayload = null
    jwt.verify(token, process.env.SECRET_KEY, async (error, payload) => {
        if (error) throw new AppError(error.message, 498)
        userPayload = payload;
    })
    
    return userPayload;
}

