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
      const { value, description, payMethod, card } = tx.getTransactionData()
      try {
        const savedTx = await db.query('INSERT INTO transactions (value, description, payMethod) VALUES ($1, $2, $3) RETURNING *', [value, description, payMethod])
        const transactionId = savedTx.rows[0].id      
        await db.query('INSERT INTO cards (id, number, owner, expiration, cvv) VALUES ($1, $2, $3, $4, $5)', [transactionId, card.number, card.owner, card.expiration, card.cvv])
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
