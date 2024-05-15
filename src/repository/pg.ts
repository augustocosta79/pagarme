import pg from "pg";
import { TransactionRepository } from "../repository/respository"
import Transaction from "../entities/transaction";
import Payable from "../entities/payable";

export const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "pagarme",
  password: "manu2308",
  port: 5432,
});

export default class pgRepository implements TransactionRepository {
    constructor(){
        this.startDB()
    }

    async startDB(): Promise<void> {          
          try {
            await db.connect()
          } catch (error) {
            throw new Error('can not connect to db')
          }
    }

    async saveTransaction(tx: Transaction){
      try {
        await db.query('INSERT INTO transactions (transaction) VALUES ($1)', [tx])
      } catch (error) {
        throw new Error('could not process the transaction')
      }
    }
    async getTransactions(): Promise<Transaction[]>{
      let transactions: Transaction[] = []
      try {
        const data = await db.query('SELECT * FROM transactions')
        transactions = data.rows.map(row => row.transaction)
      } catch (error) {
        throw new Error('error getting transactions')
      }      
      return transactions
    }
    async savePayable(payable: Payable): Promise<void> {
      try {
        await db.query('INSERT INTO payables (payable) VALUES ($1)', [payable])
      } catch (error) {
        throw new Error('could not save the payable')
      }
    }
    async getPayables(): Promise<Payable[]> {
      let payables: Payable[] = []
      try {
        const data = await db.query('SELECT * FROM payables')
        payables = data.rows.map(row => row.payable)
      } catch (error) {
        throw new Error('error getting payables')
      }      
      return payables
    }
}