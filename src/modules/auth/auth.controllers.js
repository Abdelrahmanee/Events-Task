import { User } from "../../../db/models/user.model.js";
import { AppError, catchAsyncError } from "../../utilies/catchAsyncError.js";
import { sendEmail } from "../../utilies/email.js";
import { generateOTP } from "../../utilies/generateOtp.js";
import { generateToken } from "../../utilies/token.js";
import { SEND_OTP_TEMPLATE } from "../../utilies/htmlTemplate.js";

const saveDataChanged = async (user, otp) => {
    user.otp = otp;
    user.expiresAt = Date.now() + 900000 // after 15 minutes
    await user.save()
}


export const register = catchAsyncError(async (req, res) => {
    const user = await User.create(req.body)

    const otp = generateOTP()

    saveDataChanged(user, otp)

    await sendEmail(user.email, "Otp Verfication ", SEND_OTP_TEMPLATE, otp)

    res.status(201).json({ status: "success", message: 'registerd success', email: user.email })
})


export const firstLogin = catchAsyncError(async (req, res, next) => {
    const { email, otp } = req.body

    const userIsValid = await User.findOne({ email, otp }).select('-password')
    if (!userIsValid)
        throw new AppError("Invalid otp", 400)


    const otp_expiration = new Date(userIsValid.expiresAt).getTime()  //time in miliseconds


    if (otp_expiration <= Date.now()) {
        const new_otp = generateOTP()

        saveDataChanged(userIsValid, otp)
        await sendEmail(userIsValid.email, "Otp Verfication ", SEND_OTP_TEMPLATE, new_otp)
        return res.status(400).json({  status: "fail" ,message: ["otp is expired ", 'otp is sent'] })
    }
    userIsValid.isEmailVerified = true
    userIsValid.otp = null
    userIsValid.expiresAt = null
    userIsValid.status = 'online'
    await userIsValid.save();
    // token
    const token = generateToken(userIsValid)
    res.status(200).json({ status: "success" , message: "user verified successfully", token, data: userIsValid })
})

export const login = catchAsyncError(async (req, res) => {
    const { password, ...elementsWithoutPassword } = req.user
    const token = generateToken(req.user)
    res.status(200).json({ status: "success", message: 'login success', token, data: elementsWithoutPassword })

})