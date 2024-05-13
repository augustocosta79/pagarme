import TransactionService from "../service/service";
import MemoryRepository from '../repository/memory'
import Transaction from "../entities/transaction";
import { NextFunction, Request, Response } from "express"
import { validationResult } from "express-validator";

const repository = new MemoryRepository()
const transactionService = new TransactionService(repository)

export class ServiceController {
    static async newTransaction(req: Request, res: Response, next: NextFunction){
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(422).json({message: 'You should provide valid data',error: errors.array()})      
        }
        const {value, description, payMethod, card} = req.body
        const transaction = new Transaction(value, description, payMethod, card)
        transactionService.processTransaction(transaction)
        return res.status(201).json({message: "transaction process ok"})
        
    }

    static async getTransactions(req: Request, res: Response, next: NextFunction){
        const transactions = transactionService.getTransactions()
        if(!transactions){
            return res.status(404).json({error: "unable to get transactions"})
        }

        return res.status(200).json({transactions: transactions})
    }
}

// [{"location": "body", "msg": "Fill a valid value", "path": "value", "type": "field", "value": ""}, {"location": "body", "msg": "Fill a valid value", "path": "value", "type": "field", "value": ""}]