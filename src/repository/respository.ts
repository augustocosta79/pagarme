import Payable from "../entities/payable";
import Transaction from "../entities/transaction";

export interface TransactionRepository {
    saveTransaction(tx: Transaction): Promise<void>
    getTransactions(): Promise<Transaction[]>
    savePayable(payable: Payable): Promise<void>
    getPayables(): Promise<Payable[]>
}