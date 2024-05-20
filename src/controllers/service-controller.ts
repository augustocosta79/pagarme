import TransactionService from "../service/service";
import MemoryRepository from '../repository/memory'
import Transaction from "../entities/transaction";
import { NextFunction, Request, Response } from "express"
import { validationResult } from "express-validator";

const repository = new MemoryRepository()
export const transactionService = new TransactionService(repository)

export class ServiceController {
    static async newTransaction(req: Request, res: Response, next: NextFunction){
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(422).json({message: 'You should provide valid data',error: errors.array()})      
        }
        const {value, description, payMethod, card} = req.body
        const transaction = new Transaction(+value, description, payMethod, card)
        try {
            await transactionService.processTransaction(transaction)
            return res.status(201).json({message: "transaction process ok"})
        } catch (error) {
            return res.status(500).json(new Error('Internal Server Error'))
        }        
    }
    static async getTransactions(req: Request, res: Response, next: NextFunction){
        let transactions
        try {
            transactions = await transactionService.getTransactions()
        } catch (error) {
            return res.status(500).json({error: error})
        }
        if(!transactions){
            return res.status(404).json({error: "unable to get transactions"})
        }
        return res.status(200).json({transactions: transactions})
    }
    static async checkBalance(req: Request, res: Response){
        try {
            const balance = await transactionService.checkBalance()           
            return res.status(200).json(balance)
        } catch (error) {          
            return res.status(500).json({error: error, message: 'Internal Server Error'})
        }
    }
}