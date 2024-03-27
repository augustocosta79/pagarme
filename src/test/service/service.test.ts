import TransactionService, { payableStatus } from "../../service/service";
import MemoryRepository from "../../repository/memory";
import FileRepository from "../../repository/file";
import Transaction, { cardType } from "../../entities/transaction";
import Card from "../../entities/card";

const memoryRepository = new MemoryRepository()
const memoryTransactionService = new TransactionService(memoryRepository)
const card = new Card('12345678', 'Augusto','04/29', '362')
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
    expect(memoryRepository.getPayables()).toEqual(expect.arrayContaining([
        expect.objectContaining({ 
            value: 427.5,
            status: payableStatus.waiting_funds,
            card: cardType.credit,
            paymentDate: expect.any(Date)
        })
    ]))
    expect(memoryRepository.getPayables()[0].paymentDate.getDate()).toBe(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).getDate())
})

test('Should return waiting and available client funds', ()=>{
    memoryTransactionService.processTransaction(transaction)
    expect(memoryTransactionService.checkBalance()).toEqual({ available: 0, waiting: 427.5 })
})




const fileRepository = new FileRepository()
const fileTransactionService = new TransactionService(fileRepository)


test('Should not throw Error on Process Transaction', ()=>{
    expect(()=> fileTransactionService.processTransaction(transaction)).not.toThrow(Error)
})

test('Should get transactions with transaction in it', ()=>{
    const transactions = fileTransactionService.getTransactions()
    expect(transactions).toEqual(expect.arrayContaining([transaction]))
})

test('Should create a client payable', ()=>{
    expect(()=>fileTransactionService.createClientPayable(transaction)).not.toThrow(Error)
    expect(fileRepository.getPayables()).toEqual(expect.arrayContaining([
        expect.objectContaining({ 
            value: 427.5,
            status: payableStatus.waiting_funds,
            card: cardType.credit,
        })
    ]))
})

test('Should return waiting and available client funds', ()=>{
    fileTransactionService.processTransaction(transaction)
    expect(fileTransactionService.checkBalance()).toEqual({ available: 0, waiting: 427.5 })
})