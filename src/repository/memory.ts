import Payable from "../entities/payable";
import Transaction from "../entities/transaction";
import { TransactionRepository } from "./respository";

export default class MemoryRepository implements TransactionRepository {
    
    transactions: Transaction[] = []
    payables: Payable[] = []

    saveTransaction(tx: Transaction){
        this.transactions.push(tx)
    }
    getTransactions(): Promise<Transaction[]>{
        const transactions: Promise<Transaction[]> = new Promise((resolve, reject)=>{
            resolve(this.transactions)
         })
         return transactions
    }
    savePayable(payable: Payable): void {
        this.payables.push(payable)
        // console.log(this.payables)
    }
    getPayables(): Promise<Payable[]> {
        const payables: Promise<Payable[]> = new Promise((resolve, reject)=>{
            resolve(this.payables)
        })
        return payables
    }
}