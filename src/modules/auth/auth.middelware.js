import { User } from "../../../db/models/user.model.js";
import { AppError, catchAsyncError } from "../../utilies/catchAsyncError.js";





export const checkUniqueEmail = catchAsyncError(async (req, res, next) => {

    const { email } = req.body

    const user = await User.findOne({ email })

    if (user)
        throw new AppError("email is used (try another email)", 400)

    next()
})

export const checkAccountVerification = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) throw new AppError('User not found', 404)
    user.comparePassword(password, async(err, isMatch) => {
        if (err) {
            return res.status(500).json({ message: 'Server error' });
        }

        if (isMatch) {
            if (!user.isEmailVerified) next(new AppError('you Must verified email !', 400))
            user.status = 'online'
            await user.save()
            req.user = user.toObject()
            next();
        } else {
            res.status(400).json({ message: 'Invalid username or password' });
        }
    });

})