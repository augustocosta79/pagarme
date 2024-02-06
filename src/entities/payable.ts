import { payableStatus } from "../service/service";

export default class Payable {
    constructor(
        private status: payableStatus,
        private payment_date: Date,
        private fee: number,
        private value: number
    ){}
}