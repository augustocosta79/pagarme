import Transaction from "../entities/transaction";
import { TransactionRepository } from "./respository";

export default class MemoryRepository {
    
    transactions: Transaction[] = []

    saveTransaction(tx: Transaction){
        this.transactions.push(tx)
    }

    getTransactions(){
        return this.transactions
    }
}