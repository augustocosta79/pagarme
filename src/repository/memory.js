"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MemoryRepository {
    constructor() {
        this.transactions = [];
    }
    saveTransaction(tx) {
        this.transactions.push(tx);
    }
    getTransactions() {
        return this.transactions;
    }
}
exports.default = MemoryRepository;
