"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TransactionService {
    constructor(repository) {
        this.repository = repository;
    }
    processTransaction(tx) {
        this.repository.saveTransaction(tx);
    }
    createTransactions() {
        return [];
    }
    createClientPayable() {
        return Payable;
    }
    checkBalance() { }
}
