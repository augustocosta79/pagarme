import TransactionService, { payableStatus } from "../../service/service";
import MemoryRepository from "../../repository/memory";
import FileRepository from "../../repository/file";
import Transaction, { cardType } from "../../entities/transaction";
import Card from "../../entities/card";
import * as fs from 'node:fs';

const memoryRepository = new MemoryRepository()
const memoryTransactionService = new TransactionService(memoryRepository)
const card = new Card('12345678', 'Augusto','04/29', '362')
const dateCurrent = new Date()
const days30 = 30 * 24 * 60 * 60 * 1000
const dateD30 = new Date(Date.now() + days30)
const transaction = new Transaction(450, 'Camisa do Flamengo', cardType.credit, card)

test('Should not throw Error on Process Transaction', ()=>{
    expect(()=> memoryTransactionService.processTransaction(transaction)).not.toThrow(Error)
})

test('Should get transactions with transaction in it', ()=>{
    const transactions = memoryTransactionService.getTransactions()
    expect(transactions).toContain<Transaction>(transaction)
})
test('Should create a client payable', ()=>{
    const mockDateObject = new Date();
      const spy = jest
        .spyOn(Date, "now")
        .mockImplementation(() => mockDateObject.getTime());
    expect(()=>memoryTransactionService.createClientPayable(transaction)).not.toThrow(Error)
    spy.mockRestore();
    expect(memoryRepository.getPayables()).toEqual(expect.arrayContaining([{ 
            value: 427.5,
            status: payableStatus.waiting_funds,
            card: cardType.credit,
            paymentDate: new Date(mockDateObject.getTime() + days30).toISOString()
        }
    ]))
    expect(new Date(memoryRepository.getPayables()[0].paymentDate).toLocaleDateString()).toBe(dateD30.toLocaleDateString())
})

test('Should return waiting and available client funds', ()=>{
    memoryTransactionService.processTransaction(transaction)
    expect(memoryTransactionService.checkBalance()).toEqual({ available: 0, waiting: 427.5 })
})




const fileRepository = new FileRepository()
const fileTransactionService = new TransactionService(fileRepository)
const transaction2 = new Transaction(450, 'Camisa do Flamengo', cardType.debit, card)

// Remove files to restart test with a clean new fileRepository
fs.rmSync("payables.txt", { force: true })
fs.rmSync("transactions.txt", { force: true })

test('Should not throw Error on Process Transaction', ()=>{
    expect(()=> fileTransactionService.processTransaction(transaction2)).not.toThrow(Error)
})

test('Should get transactions with transaction in it', ()=>{
    const transactions = fileTransactionService.getTransactions()
    expect(transactions).toEqual(expect.arrayContaining([transaction2]))
})

test('Should create a client payable', ()=>{
    const mockDateObject = new Date();
      const spy = jest
        .spyOn(Date, "now")
        .mockImplementation(() => mockDateObject.getTime());
    expect(()=>fileTransactionService.createClientPayable(transaction2)).not.toThrow(Error)
    spy.mockRestore();
    expect(fileRepository.getPayables()).toEqual([
       { 
            value: 436.5,
            status: payableStatus.paid,
            card: cardType.debit,
            paymentDate: mockDateObject.toISOString()
        }
    ])
    expect(new Date(fileRepository.getPayables()[0].paymentDate).getDate()).toBe(dateCurrent.getDate())
})

test('Should return waiting and available client funds', ()=>{
    fileTransactionService.processTransaction(transaction2)
    expect(fileTransactionService.checkBalance()).toEqual({ available: 436.5, waiting: 0 })
})