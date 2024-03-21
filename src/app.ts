import express from 'express'
import {mainRoute} from './routes/mainRoute'

export const app = express()

app.set('view engine', 'pug')
app.set('views', './src/views')

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/', express.static('public'))

app.use('/', mainRoute)
