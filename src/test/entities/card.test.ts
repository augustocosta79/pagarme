import Card from "../../entities/card"

describe("Card entity", ()=>{
    test("Should create new Card", ()=>{
        const card = new Card("12345678", 'Augusto', '04/29', '362')
        expect(card).toEqual({
            number: '****.****.****.5678',
            owner: 'Augusto',
            expiration: '04/29',
            cvv: '362',
        })
    })
})