import express from 'express'
import { mainRoute } from './routes/mainRoute'
import cookieParser from 'cookie-parser'
import 'dotenv/config'

export const app = express()

app.set('view engine', 'pug')
app.set('views', './src/views')

app.use(cookieParser(process.env.COOKIE_SECRET))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', express.static('public'))

app.use('/', mainRoute)
