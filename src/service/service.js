"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TransactionService {
    constructor(repository) {
        this.repository = repository;
    }
    processTransaction(tx) {
        this.repository.saveTransaction(tx);
    }
    getTransactions() {
        return this.repository.getTransactions();
    }
    createClientPayable(tx, payment_date, fee) {
    }
    checkBalance() { }
}
exports.default = TransactionService;
