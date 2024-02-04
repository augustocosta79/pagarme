"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Card {
    constructor(number, owner, expiration, cvv) {
        this.number = number;
        this.owner = owner;
        this.expiration = expiration;
        this.cvv = cvv;
    }
}
exports.default = Card;
