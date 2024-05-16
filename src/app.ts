import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { transactionServiceRouter } from './routes/transaction-route'
import { checkBalanceServiceRouter } from './routes/check-balance-route'

const app = express()

app.use(bodyParser.json())
app.use(cors())

app.use('/transactions', transactionServiceRouter)
app.use('/check-balance', checkBalanceServiceRouter)

export default app