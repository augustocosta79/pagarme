import { body } from 'express-validator'
import { NextFunction } from "express"

const checkTransaction = async(req: Request, res: Response, next: NextFunction)=>{
    return next()
}

export default checkTransaction