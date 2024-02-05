"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const transaction_1 = __importDefault(require("./entities/transaction"));
const service_1 = __importDefault(require("./service/service"));
const file_1 = __importDefault(require("./repository/file"));
const transaction_2 = require("./entities/transaction");
const card_1 = __importDefault(require("./entities/card"));
const tx = new transaction_1.default(450, 'Camisa do Flamengo', transaction_2.cardType.credit, new card_1.default('12345678', 'Augusto', '04/29', '362'));
const repository = new file_1.default();
const transactionService = new service_1.default(repository);
transactionService.processTransaction(tx);
console.log(transactionService.getTransactions());
