import Card from './card'

export enum cardType { debit = "debit", credit = "credit" }

export default class Transaction {
    constructor(
        private value: number,
        private description: string,
        private payMethod: cardType,
        private card: Card,
        )
        {}

        getTransactionData(){
            return { 
                value: this.value,
                description: this.description,
                payMethod: this.payMethod,
                card: this.card,
            }
        }
}