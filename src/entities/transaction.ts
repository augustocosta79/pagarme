import Card from './card'

export enum cardType { debit, credit }

export default class Transaction {
    constructor(
        private value: number,
        private description: string,
        private payMethod: cardType,
        private card: Card,
        )
        {}
}