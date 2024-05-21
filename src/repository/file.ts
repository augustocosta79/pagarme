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
  async saveTransaction(tx: Transaction): Promise<void> {
    let transactions: Transaction[];
    transactions = this.getFileData(this.transactionsFile);
    transactions.push(tx);
    fs.writeFileSync(this.transactionsFile, JSON.stringify(transactions));
  }
  async getTransactions(): Promise<Transaction[]> {
    let transactions: Transaction[];
    transactions = this.getFileData(this.transactionsFile);
    return transactions;
  }
  async savePayable(payable: Payable): Promise<void> {
    const payables = this.getFileData(this.payablesFile);
    payables.push(payable);
    fs.writeFileSync(this.payablesFile, JSON.stringify(payables));
  }
  async getPayables(): Promise<Payable[]> {
    const payables = this.getFileData(this.payablesFile);
    return payables;
  }
}