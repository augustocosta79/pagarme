import TransactionService, { payableStatus } from "../../service/service";
import Transaction, { cardType } from "../../entities/transaction";
import Card from "../../entities/card";
// import * as fs from 'node:fs';

const saveTransaction = jest.fn()
const getTransactions = jest.fn()
const savePayable = jest.fn()
const getPayables = jest.fn()

const repository = { saveTransaction, getTransactions, savePayable, getPayables }
const transactionService = new TransactionService(repository)
const card = new Card('12345678', 'Augusto','04/29', '362')
const transaction = new Transaction(450, 'Camisa do Flamengo', cardType.credit, card)

test('Should not throw Error on Process Transaction', async ()=>{
    try {
        await transactionService.processTransaction(transaction)
    } catch (error) {
        expect(error).toBeUndefined()
    }
})

test('Should get transactions with transaction in it', async ()=>{
    getTransactions.mockResolvedValue([transaction])
    try {
        const response = await transactionService.getTransactions()
        expect(response).toEqual(expect.arrayContaining([transaction]))
    } catch (error) {
        expect(error).toBeUndefined()
    }    
})
test('Should create a client payable', async ()=>{  
    try {
        await transactionService.createClientPayable(transaction)
    } catch (error) {
        expect(error).toBeUndefined()
    }
})

test('Should return waiting and available client funds', async ()=>{
    getPayables.mockResolvedValue([{
        payableValue: 10,
        status: payableStatus.paid,
        card: cardType.debit,
        paymentDate: "any date string"            
    },
    {
        payableValue: 20,
        status: payableStatus.waiting_funds,
        card: cardType.credit,
        paymentDate: "any date string"            
    }])
    try {
        const balance = await transactionService.checkBalance()
        expect(balance).toEqual({ available: 10, waiting: 20 })
    } catch (error) {
        expect(error).toBeUndefined()
    }
})