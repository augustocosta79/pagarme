"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Card {
    constructor(number, owner, expiration, cvv) {
        this.number = number;
        this.owner = owner;
        this.expiration = expiration;
        this.cvv = cvv;
        this.number = '****.****.****.' + this.number.slice(-4);
    }
}
exports.default = Card;
