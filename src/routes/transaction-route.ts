import { Router } from 'express'
import { ServiceController } from '../controllers/service-controller'
import validateTransaction from '../middleware/validate-transaction'

export const transactionServiceRouter = Router()

transactionServiceRouter.post('/', validateTransaction(), ServiceController.newTransaction)
transactionServiceRouter.get('/', ServiceController.getTransactions)