import { Router } from 'express'
import { ServiceController } from '../controllers/service-controller'


export const transactionServiceRouter = Router()


// // GET ALL QUESTIONS FROM QUIZZ /all
// transactionServiceRouter.get('/get', Quizz.getQuestions)

// PROCESS TRANSACTIONS
transactionServiceRouter.post('/new-transaction', ServiceController.newTransaction)