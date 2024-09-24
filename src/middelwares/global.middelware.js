import { User } from "../../db/models/user.model.js";
import { AppError, catchAsyncError } from "../utilies/catchAsyncError.js";
import { ROLES } from "../utilies/enums.js";
import { verifiyToken } from "../utilies/token.js";





export const errorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        ...(process.env.MODE === 'devlopment' && { stack: err.stack })
    });
}
export const authenticate = catchAsyncError(async (req, res, next) => {

    const token = req.header('token');

    if (!token)
        throw new AppError('Un Athorized', 401)

    const payload = await verifiyToken(token)

    const user = await User.findById(payload._id)

    if (!user) return next(new AppError("user not found", 404))
    if (user.status === 'offline')
        return next(new AppError("you must login first", 401))

    req.user = user.toObject()
    next()
})

export const authorize = (roles = Object.values(ROLES)) => {
    return (req, res, next) => {
        if (roles.includes(req.user.role)) return next()
        return next(new AppError('you not allowed to access this endpoint', 403))
    }
}
