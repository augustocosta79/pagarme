import Transaction from "../../entities/transaction"
import { cardType } from "../../entities/transaction"
import Card from "../../entities/card"

const card = new Card('12345678', 'Augusto','04/29', '362')
const transaction = new Transaction(450, 'Camisa do Flamengo', cardType.credit, card)

test('Should create a card', ()=>{
    
    expect(card).toEqual(
        {
            number: '****.****.****.5678',
            owner: 'Augusto',
            expiration: '04/29',
            cvv: '362',
        }
    )
})

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

test('Should get raw transaction data', ()=>{
    expect(transaction.getTransactionData()).toEqual(
        {
            value: 450,
            description: 'Camisa do Flamengo',
            payMethod: 'credit',
            card: card
        }
    )
    
})