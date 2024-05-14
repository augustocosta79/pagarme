import Transaction from "../entities/transaction";
import { TransactionRepository } from "../repository/respository";
import Payable from "../entities/payable";


export enum payableStatus {
  paid = "paid",
  waiting_funds = "waiting funds",
}

export default class TransactionService {
  constructor(private repository: TransactionRepository) {}

  processTransaction(tx: Transaction) {
    this.repository.saveTransaction(tx);
  }
  getTransactions() {
    return this.repository.getTransactions();
  }
  createClientPayable(tx: Transaction) {
    const { value, payMethod } = tx;    
    const payable = new Payable(value, payMethod);
    this.repository.savePayable(payable);
  }
  checkBalance() {
    const payables: any[] = this.repository.getPayables();
    const valuesAvailables = payables.map((payable) => {
      if (payable.status === payableStatus.paid) {
        return payable.value;
      }
      return 0;
    });
    const valuesWaitingFunds = payables.map((payable) => {
      if (payable.status === payableStatus.waiting_funds) {
        return payable.value;
      }
      return 0;
    });
    const totalAvailable = valuesAvailables.reduce((total, value)=>{return total + value}, 0);
    const totalWaitingFunds = valuesWaitingFunds.reduce((total, value)=>{return total + value}, 0);
    // console.log({available: totalAvailable, waiting: totalWaitingFunds});
    return {available: totalAvailable, waiting: totalWaitingFunds}
  }
}
