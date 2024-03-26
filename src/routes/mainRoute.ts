import express, { Request, Response } from 'express'
import { imageRepo } from '../repo/imageRepo'

export const mainRoute = express.Router()

mainRoute.get('/', (_req: Request, res: Response) => {
	res.render('index')
})

mainRoute.post('/', (req: Request, res:Response) => {
	const fileName = imageRepo.makeImage(req.body.name, req.body.sum, req.body.number)
	const data = imageRepo.makeData()

	const table = {
		num: req.body.number,
		data: data[0],
		name: req.body.name,
		status: data[1],
		sum: req.body.sum,
	}
	res.render('download', {image: fileName, table: table})
})
