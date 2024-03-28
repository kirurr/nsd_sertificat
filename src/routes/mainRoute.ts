import express, { Request, Response } from 'express'
import { imageRepo } from '../repo/imageRepo'
import { Result, ValidationError, body, matchedData, validationResult } from 'express-validator'

export const mainRoute = express.Router()

mainRoute.get('/', (_req: Request, res: Response) => {
	res.render('index')
})

mainRoute.post('/', body('*').trim().escape().isLength({max: 256}).withMessage('Слишком длинный текст'), async (req: Request, res:Response) => {
	const validationData = validationResult(req)

	if(!validationData.isEmpty()) {
		const errorsArray = validationData.array().map(error => {
			if (error.type === 'field') {
        const result: { message: string; field: string } = {
          message: error.msg,
          field: ''
        }

        switch (error.path) {
          case 'name':
            result.field = 'ФИО'
            break
          case 'sum':
            result.field = 'Сумма'
            break
					case 'number':
						result.field = 'Номер сертификата'
						break
        }

        return result
      }
		})
		return res.render('error', {errors: errorsArray})
	}

	req.body = matchedData(req)

	const fileName = await imageRepo.makeImage(req.body.name, req.body.sum, req.body.number)
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
