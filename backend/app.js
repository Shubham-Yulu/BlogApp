import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import helmet from 'helmet'
import routes from './routes/index.js';

const port = 3000
const app = express()
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan('short'))

app.use("/api/", routes);

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})