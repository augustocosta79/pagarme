import Card from "../../entities/card";
import Payable from "../../entities/payable";
import Transaction, { cardType } from "../../entities/transaction"
import pgRepository from "../../repository/pg"

const card = new Card("123456789012", "Augusto", "04/29", "362");
const transaction: Transaction = new Transaction(450, "Camisa do Flamengo", cardType.debit, card)
const payable = new Payable(100, cardType.credit)

const repository = new pgRepository()

describe("Test pgRepository", ()=>{
    test("Should SAVE a TRANSACTION without error", async ()=>{
        try {
            await repository.saveTransaction(transaction)
        } catch (error) {
            expect(error).toBeUndefined()
        }
    })
    test("Should RETURN a TRANSACTION LIST", async ()=>{
        try {
            const transactions = await repository.getTransactions()
            expect(transactions).toEqual(expect.arrayContaining([transaction]))
        } catch (error) {
            expect(error).toBeUndefined()
        }
    })
    test("Should SAVE a PAYABLE w/out error", async()=>{
        try {
            await repository.savePayable(payable)
        } catch (error) {
            expect(error).toBeUndefined()
        }
    })
    test("Should RETURN a PAYABLE LIST", async ()=>{
        try {
          const payables = await repository.getPayables()          
          expect(payables).toEqual(expect.arrayContaining([payable]))  
        } catch (error) {
            expect(error).toBeUndefined()
        }
    })
})