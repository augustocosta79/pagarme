import { Router } from 'express'
import { ServiceController } from '../controllers/service-controller'
import validateTransaction from '../middleware/validate-transaction'


export const transactionServiceRouter = Router()


// // GET ALL QUESTIONS FROM QUIZZ /all
// transactionServiceRouter.get('/get', Quizz.getQuestions)

// PROCESS TRANSACTIONS
transactionServiceRouter.post('/new-transaction', validateTransaction(), ServiceController.newTransaction)