import Transaction from "../entities/transaction";
import { TransactionRepository } from "../repository/respository";

class TransactionService {

    constructor(
        private repository: TransactionRepository
    ){}

    processTransaction(tx: Transaction){
        this.repository.saveTransaction(tx)
    }

    createTransactions(){
        return []
    }

    createClientPayable(){
        return Payable
    }

    checkBalance(){}
}