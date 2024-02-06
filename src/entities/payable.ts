import { payableStatus } from "../service/service";

export default class Payable {
    constructor(
        private status: payableStatus,
        private fee: number,
        private value: number
    ){}

    payableData() { 
        return { 
            status: this.status,
            fee: this.fee,
            value: this.value
        }
    }
}