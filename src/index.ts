import { app } from './app'

const port = process.env.PORT || 3000

if (process.env.PORT) app.listen(+port, '0.0.0.0', () => {})
else
  app.listen(port, () => {
    console.log(`http://localhost:${port}/`)
  })
