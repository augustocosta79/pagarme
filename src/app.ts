import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { transactionServiceRouter } from './routes/transaction-service'

const app = express()

app.use(bodyParser.json())
app.use(cors())

app.use('/transactions', transactionServiceRouter)

export default app