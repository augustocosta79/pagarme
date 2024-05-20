import Transaction from "../entities/transaction";
import { TransactionRepository } from "../repository/respository";
import Payable from "../entities/payable";


export enum payableStatus {
  paid = "paid",
  waiting_funds = "waiting funds",
}

export default class TransactionService {
  constructor(private repository: TransactionRepository) {}

  async processTransaction(tx: Transaction) {
    await this.repository.saveTransaction(tx);
    await this.createClientPayable(tx)
  }
  async getTransactions() {
    const transactions = await this.repository.getTransactions();
    return transactions
  }
  async createClientPayable(tx: Transaction) {
    const { value, payMethod } = tx;    
    const payable = new Payable(value, payMethod);
    await this.repository.savePayable(payable);
  }
  async checkBalance() {
    const payables: Payable[] = await this.repository.getPayables();        
    const valuesAvailables = payables.map((payable) => {
      if (payable.status === payableStatus.paid) {
        return payable.payableValue;
      }
      return 0;
    });
    const valuesWaitingFunds = payables.map((payable) => {
      if (payable.status === payableStatus.waiting_funds) {
        return payable.payableValue;
      }
      return 0;
    });
    const totalAvailable = valuesAvailables.reduce((total, value)=>{return total + value}, 0);
    const totalWaitingFunds = valuesWaitingFunds.reduce((total, value)=>{return total + value}, 0);       
    return {available: totalAvailable, waiting: totalWaitingFunds}
  }
}
