enum payType {debit = 'debit_card', credit = 'credit_card'}
enum payStatus {paid = 'paid', waiting = 'waiting_funds'}
enum feefor {debit = 0.03, credit = 0.05}

class Transaction {
    constructor(
        private value: number,
        private description: string,
        private payment: string,
        private ccnumber: string,
        private ccowner: string,
        private ccexpire: string,
        private cccvv: number,
        private status: string = '',
        private date: string = '',
        private fee: number = 0,
        ){
            let rawdate: Date = new Date()

            if (this.payment == payType.debit) {
                this.status = payStatus.paid
                this.fee = feefor.debit
                this.date = rawdate.toLocaleDateString()
            }
            
            if (this.payment == payType.credit) {
                this.status = payStatus.waiting
                this.fee = feefor.credit
                rawdate.setDate(rawdate.getDate() + 30)
                this.date = rawdate.toLocaleDateString()
            }
            
            this.ccnumber = '****.****.****.' + this.ccnumber.slice(-4)
            
        }

        payStatus(): string{
            return this.status
        }

        finalFee(): number {
            return (1 - this.fee)
        }
        
}

class Client {

    constructor (private _id: string) {}
    private transactions: Transaction[] = []
    private available: number = 0
    private waiting: number = 0
    get id(): string { return this._id }

    cashIn(value: number, description:string,
        payment: string, ccnumber: string, ccowner: string,
        ccexpire: string, cccvv: number): void 
    {
        const transacao = new Transaction(value, description, payment, ccnumber, ccowner, ccexpire, cccvv)
        this.transactions.push(transacao)
        
        if (transacao.payStatus() == payStatus.paid) {
            this.available += value * transacao.finalFee()
        }

        if (transacao.payStatus() == payStatus.waiting) {
            this.waiting += value * transacao.finalFee()
        }
    }

    transactionList(): Transaction[] {
        return this.transactions
    }

    funds() {
        return {available: this.available, waiting: this.waiting}
    }
}

export class clientControl {
    constructor(
        ){
        }
        private static LoggedClients: Client[] = []

        private static setIndex(id: string): number {
            return clientControl.LoggedClients.findIndex((client: Client, index: number, array: Client[]) => {
                return client.id == id;
            })
        }

        static clientTransactions(id: string) {
            let index = clientControl.setIndex(id)

            if (index >=0) {
                return clientControl.LoggedClients[index].transactionList()
            } else {
                return 'ainda não existem depósitos para este cliente'
            }
        }

        static clientFunds(id: string){
            let index = clientControl.setIndex(id)
            if(index < 0) {
                return 'Este usuário não existe'
            }
            return clientControl.LoggedClients[index].funds()
        }

        static clientCashin(id: string, value: number, description:string,
            payment: string, ccnumber: string, ccowner: string,
            ccexpire: string, cccvv: number)
            {
            let index = clientControl.setIndex(id)
            if (index < 0) {
                clientControl.LoggedClients.push(new Client(id))
                index = clientControl.setIndex(id)
            }
            clientControl.LoggedClients[index].cashIn(value, description,
                payment, ccnumber, ccowner,
                ccexpire, cccvv)
        }
    
}