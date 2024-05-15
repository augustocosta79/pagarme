import Payable from "../../entities/payable";
import { cardType } from "../../entities/transaction";
import {feeValue} from '../../entities/payable'
import { payableStatus } from "../../service/service";

test('Should create a Payable', ()=>{
    const payable = new Payable(100, cardType.debit)
    expect(payable).toEqual(expect.any(Payable))
    expect(payable.payableValue).toBe(100 * (1- feeValue.debit))
    expect(payable.paymentType).toBe(cardType.debit)
    expect(payable.status).toBe(payableStatus.paid)
    expect(new Date(payable.paymentDate)).toEqual(expect.any(Date))
})
