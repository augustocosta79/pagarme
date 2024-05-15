import { payableStatus } from "../service/service";
import { cardType } from "./transaction";

export enum feeValue {
    debit = 0.03,
    credit = 0.05,
}

export default class Payable {
    readonly fee: number
    readonly status: payableStatus
    readonly paymentDate: string
    readonly payableValue: number
    constructor(
        private txValue: number,
        readonly paymentType: cardType
    ){
        if(paymentType === cardType.debit) {
            this.fee = 1 - feeValue.debit
            this.status = payableStatus.paid
            this.paymentDate = new Date(Date.now()).toISOString()            
        } else {
            this.fee = 1 - feeValue.credit
            this.status = payableStatus.waiting_funds
            this.paymentDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
        }
        this.payableValue = txValue * this.fee
    }
}