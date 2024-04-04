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
            res.status(422).json({message: "invalid value"})
            return           
        }
        const {value, description, payMethod, card} = req.body
        const transaction = new Transaction(value, description, payMethod, card)
        transactionService.processTransaction(transaction)
        res.status(201).json({message: "transaction process ok"})
        
    }
}