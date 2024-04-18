import express from 'express'
import morgan from 'morgan'

const port = 3000
const app = express()

app.use(morgan('short'))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})