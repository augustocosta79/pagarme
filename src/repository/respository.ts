import Payable from "../entities/payable";
import Transaction from "../entities/transaction";

export interface TransactionRepository {
    saveTransaction(tx: Transaction): void
    getTransactions(): Promise<Transaction[]>
    savePayable(payable: Payable): void
    getPayables(): Promise<Payable[]>
}