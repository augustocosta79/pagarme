import { body } from 'express-validator'
import { cardType } from '../entities/transaction'

const validateTransaction = ()=>{
    return [ 
        body('value', "invalid value").trim().not().isEmpty().isFloat({gt: 0}),
        body('description', "invalid description").trim().not().isEmpty().isLength({min: 5}),
        body('payMethod', "invalid payMethod").not().isEmpty().custom( value => Object.values(cardType).includes(value) ),
        body('card', 'card is not optional').not().isEmpty().isObject(),
        body('card.*', "provide a some card").isString(),
        body('card.number', "invalid card number").isLength({min: 19, max: 19}).custom(cardNumber => cardNumber.slice(0, 15) === '****.****.****.'),
        body('card.owner', "invalid card owner").isLength({min: 3}),
        body('card.expiration', "invalid card expiration").isLength({min: 5, max:5}).custom( expDate => +expDate.slice(0, 2) > 0 && +expDate.slice(0, 2) <= 12 ),
        body('card.cvv', "invalid card cvv").isLength({min: 3, max: 3}).custom(cvv => typeof +cvv === 'number')
        
    ]
}

export default validateTransaction