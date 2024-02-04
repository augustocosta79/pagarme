export default class Card {
    constructor(
        private number: string,
        private owner: string,
        private expiration: string,
        private cvv: string,
    ){
        this.number = '****.****.****.' + this.number.slice(-4)
    }
}