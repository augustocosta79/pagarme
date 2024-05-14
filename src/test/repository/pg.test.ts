import Card from "../../entities/card";
import Transaction, { cardType } from "../../entities/transaction"
import pgRepository from "../../repository/pg"

const card = new Card("123456789012", "Augusto", "04/29", "362");
const transaction: Transaction = new Transaction(450, "Camisa do Flamengo", cardType.debit, card)

const repository = new pgRepository()

describe("Test pgRepository", ()=>{
    test("Should process a Transaction without error", async ()=>{
        try {
            await repository.saveTransaction(transaction)
        } catch (error) {
            expect(error).toBeUndefined()
        }
    })
    test("Should return a transaction list", async ()=>{
        try {
            const transactions = await repository.getTransactions()
            expect(transactions).toEqual(expect.arrayContaining([transaction]))
        } catch (error) {
            expect(error).toBeUndefined()
        }
    })
})