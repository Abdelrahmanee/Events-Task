

import express from 'express'
import { connectToDb } from '../db/db.connect.js'
import cors from 'cors'
import morgan from 'morgan'
import { AppError } from './utilies/catchAsyncError.js'
import { errorHandler } from './middelwares/global.middelware.js'
import v1Router from './routes/v1.routes.js'
import { cron } from './utilies/cron.js'

export const bootstrap = (app) =>{

    app.use(cors());
    app.use(express.json())
    app.use(morgan('dev'))

    cron()
    

    app.use('/api/v1' , v1Router)
    
    app.all('*', (req, res, next) => {
        throw new AppError('Route not found', 404)
    })
    
     connectToDb()

    app.use(errorHandler)
}