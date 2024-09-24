import { Router } from "express";
import { firstLogin, login, register } from "./auth.controllers.js";
import { checkAccountVerification, checkUniqueEmail } from "./auth.middelware.js";
import { validate } from "../../middelwares/validation.middelware.js";
import { firstLoginSchema, loginSchema, registerSchema } from "./auth.validate.js";



const authRouter = Router()


authRouter.post('/register', validate(registerSchema) ,checkUniqueEmail, register)
authRouter.post('/first_login', validate(firstLoginSchema) , firstLogin)
authRouter.post('/login', validate(loginSchema) ,checkAccountVerification, login)



export default authRouter