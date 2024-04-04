import { body } from 'express-validator'

const validateTransaction = ()=>{
    return body('value').not().isEmpty().isFloat({gt: 0})
}

export default validateTransaction