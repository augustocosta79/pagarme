import TransactionService, { payableStatus } from "../../service/service";
import MemoryRepository from "../../repository/memory";
import Transaction, { cardType } from "../../entities/transaction";
import Card from "../../entities/card";
import Payable from "../../entities/payable";

const repository = new MemoryRepository()
const transactionService = new TransactionService(repository)
const card = new Card('12345678', 'Augusto','04/29', '362')
const transaction = new Transaction(450, 'Camisa do Flamengo', cardType.credit, card)

test('Should not throw Error on Process Transaction', ()=>{
    expect(()=> transactionService.processTransaction(transaction)).not.toThrow(Error)
})

test('Should get transactions with transaction in it', ()=>{
    const transactions = transactionService.getTransactions()
    expect(transactions).toContain<Transaction>(transaction)
})
test('Should create a client payable', ()=>{
    expect(()=>transactionService.createClientPayable(transaction)).not.toThrow(Error)
    expect(repository.getPayables()).toEqual(expect.arrayContaining([
        expect.objectContaining({ 
            value: 427.5,
            status: payableStatus.waiting_funds,
            card: cardType.credit,
        })
    ]))
})