class Transaction {
    constructor(
        private clientId: string,
        private value: number,
        private description: string,
        private card: {
            method: string,
            number: string,
            owner: string,
            expiration: string,
            cvv: string,
            },
        )
        {}
        
}