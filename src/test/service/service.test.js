"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const transaction_1 = __importDefault(require("../../entities/transaction"));
const card_1 = __importDefault(require("../../entities/card"));
const transaction_2 = require("../../entities/transaction");
const node_test_1 = __importDefault(require("node:test"));
(0, node_test_1.default)('should crate a card', () => {
    const card = new card_1.default('123456', 'Augusto', '6/2028', '362');
});
(0, node_test_1.default)("should Process a Transaction", () => {
    const card = new card_1.default('123456', 'Augusto', '6/2028', '362');
    const tx = new transaction_1.default(450, 'Camisa Flamengo', transaction_2.cardType.credit, card);
});
