import Card from './card'

export enum cardType { debit = "debit", credit = "credit" }

export default class Transaction {
    constructor(
        readonly value: number,
        readonly description: string,
        readonly payMethod: cardType,
        readonly card: Card,
        )
        {}
}