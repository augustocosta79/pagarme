import Transaction from "../entities/transaction";
import { TransactionRepository } from "../repository/respository";

export default class TransactionService {

    constructor(
        private repository: TransactionRepository
    ){}

    processTransaction(tx: Transaction){
        this.repository.saveTransaction(tx)
    }

    getTransactions(){
        return this.repository.getTransactions()
    }

    createClientPayable(tx:Transaction, payment_date: string, fee: number){
    }

    checkBalance(){}
}