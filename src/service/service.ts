import Transaction from "../entities/transaction";
import { TransactionRepository } from "../repository/respository";
import { cardType } from "../entities/transaction";
import Payable from "../entities/payable";

enum feeValue {
  debit = 0.03,
  credit = 0.05,
}
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
    const { value, description, payMethod, card } = tx.getTransactionData();
    const status =
      payMethod === cardType.debit
        ? payableStatus.paid
        : payableStatus.waiting_funds;
    const payment_date =
      payMethod === cardType.debit
        ? new Date(Date.now())
        : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    const fee = payMethod === cardType.debit ? feeValue.debit : feeValue.credit;
    const payableValue = value * (1 - fee);
    const payable = new Payable(status, fee, payableValue);
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
    console.log({available: totalAvailable, waiting: totalWaitingFunds});
  }
}
