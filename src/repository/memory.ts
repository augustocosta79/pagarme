import Payable from "../entities/payable";
import Transaction from "../entities/transaction";
import { TransactionRepository } from "./respository";

export default class MemoryRepository implements TransactionRepository {
    
    transactions: Transaction[] = []
    payables: any[] = []

    saveTransaction(tx: Transaction){
        this.transactions.push(tx)
    }
    getTransactions(){
        return this.transactions
    }
    savePayable(payable: Payable): void {
        this.payables.push(payable.payableData())
        console.log(this.payables)
    }
    getPayables(): Payable[] {
        return this.payables
    }
}