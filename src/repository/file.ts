import Payable from "../entities/payable";
import Transaction from "../entities/transaction";
import { TransactionRepository } from "./respository";
import fs from "fs";

export default class FileRepository implements TransactionRepository {
  transactionsFile = "transactions.txt";
  payablesFile = "payables.txt";

  getFileData(fileName: string) {
    if (fs.existsSync(fileName)) {
      const data = fs.readFileSync(fileName).toString();
      return JSON.parse(data);
    }
    return [];
  }
  saveTransaction(tx: Transaction): void {
    let transactions: Transaction[];
    transactions = this.getFileData(this.transactionsFile);
    transactions.push(tx);
    fs.writeFileSync(this.transactionsFile, JSON.stringify(transactions));
  }
  getTransactions(): Transaction[] {
    let transactions: Transaction[];
    transactions = this.getFileData(this.transactionsFile);
    return transactions;
  }
  savePayable(payable: Payable): void {
    const payables = this.getFileData(this.payablesFile);
    payables.push(payable.data());
    fs.writeFileSync(this.payablesFile, JSON.stringify(payables));
    // console.log(payables);
  }
  getPayables(): Payable[] {
    const payables = this.getFileData(this.payablesFile);
    return payables;
  }
}