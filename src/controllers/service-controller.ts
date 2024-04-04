import TransactionService from "../service/service";
import MemoryRepository from '../repository/memory'
import Transaction from "../entities/transaction";
import { NextFunction, Request, Response } from "express"

const repository = new MemoryRepository()
const transactionService = new TransactionService(repository)

export class ServiceController {
    static async newTransaction(req: Request, res: Response, next: NextFunction){
        const {value, description, payMethod, card} = req.body
        const transaction = new Transaction(value, description, payMethod, card)
        transactionService.processTransaction(transaction)
        res.status(201).json({message: "transaction process ok"})
    }
}