import Transaction from "../entities/transaction";
import { TransactionRepository } from "./respository";

export default class MemoryRepository {
    
    transactionList: Transaction[] = []

    saveTransaction(tx: Transaction){
        this.transactionList.push(tx)
    }
}