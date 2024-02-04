import Transaction from "./entities/transaction";
import TransactionService from "./service/service";
import MemoryRepository from "./repository/memory";
import { cardType } from "./entities/transaction";
import Card from "./entities/card";

const tx = new Transaction(450, 'Camisa do Flamengo', cardType.credit, new Card('12345678', 'Augusto', '04/29', '362'))

const repository = new MemoryRepository()

const transactionService = new TransactionService(repository)

transactionService.processTransaction(tx)

console.log(transactionService.getTransactions())