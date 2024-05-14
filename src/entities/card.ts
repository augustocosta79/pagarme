export default class Card {
    constructor(
        readonly number: string,
        readonly owner: string,
        readonly expiration: string,
        readonly cvv: string,
    ){
        this.number = '****.****.****.' + this.number.slice(-4)
    }
}