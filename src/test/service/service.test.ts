import Transaction from "../../entities/transaction"
import Card from "../../entities/card"
import { cardType } from "../../entities/transaction"
import test from "node:test"

test('should crate a card', ()=>{
    const card = new Card('123456', 'Augusto','6/2028', '362')        
})

test("should Process a Transaction", ()=>{
    const card = new Card('123456', 'Augusto','6/2028', '362')
    const tx = new Transaction(450, 'Camisa Flamengo', cardType.credit, card)
})