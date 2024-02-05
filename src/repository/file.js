"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const memory_1 = __importDefault(require("./memory"));
const fs_1 = __importDefault(require("fs"));
class FileRepository extends memory_1.default {
    constructor() {
        super(...arguments);
        this.transactionsFile = 'transactions.txt';
    }
    readFileIfExists() {
        if (fs_1.default.existsSync(this.transactionsFile)) {
            const data = fs_1.default.readFileSync(this.transactionsFile).toString();
            return JSON.parse(data);
        }
        return [];
    }
    saveTransaction(tx) {
        let transactions = [];
        transactions = this.readFileIfExists();
        transactions.push(tx);
        fs_1.default.writeFileSync(this.transactionsFile, JSON.stringify(transactions));
    }
    getTransactions() {
        let transactions = [];
        transactions = this.readFileIfExists();
        return transactions;
    }
}
exports.default = FileRepository;
