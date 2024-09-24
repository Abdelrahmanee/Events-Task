import express from 'express'
import dotenv from 'dotenv'
import { bootstrap } from './src/bootstrap.js'

dotenv.config()

const app = express()
const port = +process.env.PORT || 3000

bootstrap(app)


app.listen(port, () => console.log(`Example app listening on port ${port}!`))