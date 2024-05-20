import Transaction from "../../entities/transaction"
import { cardType } from "../../entities/transaction"
import Card from "../../entities/card"

const card = {
    number: '****.****.****.5678',
    owner: 'Augusto',
    expiration: '04/29',
    cvv: '362',
}
const transaction = new Transaction(450, 'Camisa do Flamengo', cardType.credit, card)

describe("Transaction entity", ()=>{
    test('Should create a transaction', ()=> {
        expect(transaction).toEqual(
            {
                value: 450,
                description: 'Camisa do Flamengo',
                payMethod: 'credit',
                card: card
            }
        )        
    })
})