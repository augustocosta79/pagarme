import Transaction from "../entities/transaction";
import MemoryRepository from "./memory";
import fs from "fs";

export default class FileRepository extends MemoryRepository {
  transactionsFile = "transactions.txt";

  getFileData() {
    if (fs.existsSync(this.transactionsFile)) {
      const data = fs.readFileSync(this.transactionsFile).toString();
      return JSON.parse(data);
    }
    return [];
  }

  saveTransaction(tx: Transaction): void {
    let transactions: Transaction[];
    transactions = this.getFileData();
    transactions.push(tx);
    fs.writeFileSync(this.transactionsFile, JSON.stringify(transactions));
  }

  getTransactions(): Transaction[] {
    let transactions: Transaction[];
    transactions = this.getFileData();
    return transactions;
  }

  savePayable(): void {
    
  }
}
