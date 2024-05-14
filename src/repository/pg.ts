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
      const transaction = tx.getTransactionData()
      try {
        await db.query('INSERT INTO transactions (transaction) VALUES ($1)', [transaction])
      } catch (error) {
        throw new Error('could not process the transaction')
      }
    }

    // getTransactions(): Transaction[]{
        
    // }
    // savePayable(payable: Payable): void {
       
    // }
    // getPayables(): Payable[] {
        
    // }
}
