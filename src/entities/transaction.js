"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cardType = void 0;
var cardType;
(function (cardType) {
    cardType[cardType["debit"] = 0] = "debit";
    cardType[cardType["credit"] = 1] = "credit";
})(cardType = exports.cardType || (exports.cardType = {}));
class Transaction {
    constructor(value, description, payMethod, card) {
        this.value = value;
        this.description = description;
        this.payMethod = payMethod;
        this.card = card;
    }
}
exports.default = Transaction;
