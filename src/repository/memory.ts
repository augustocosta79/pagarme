import Payable from "../entities/payable";
import Transaction from "../entities/transaction";
import { TransactionRepository } from "./respository";

export default class MemoryRepository implements TransactionRepository {
    
    transactions: Transaction[] = []
    payables: Payable[] = []

    async saveTransaction(tx: Transaction): Promise<void> {
        this.transactions.push(tx)
    }
    async getTransactions(): Promise<Transaction[]>{
         return this.transactions
    }
    async savePayable(payable: Payable): Promise<void> {
        this.payables.push(payable)
    }
    async getPayables(): Promise<Payable[]> {
        return this.payables
    }
}