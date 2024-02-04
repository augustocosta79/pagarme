import Transaction from "../entities/transaction";

export interface TransactionRepository {
    saveTransaction(tx: Transaction): void
}