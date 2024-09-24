import { Router } from "express"
import authRouter from "../modules/auth/auth.routes.js"
import eventRouter from "../modules/event/event.routes.js"




const v1Router = Router()

v1Router.use('/auth', authRouter)
v1Router.use('/events', eventRouter)


export  default v1Router