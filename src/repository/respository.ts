import Payable from "../entities/payable";
import Transaction from "../entities/transaction";

export interface TransactionRepository {
    saveTransaction(tx: Transaction): void
    getTransactions(): Transaction[]
    savePayable(payable: Payable): void
}