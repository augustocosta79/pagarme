"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MemoryRepository {
    constructor() {
        this.transactionList = [];
    }
    saveTransaction(tx) {
        this.transactionList.push(tx);
    }
}
exports.default = MemoryRepository;
