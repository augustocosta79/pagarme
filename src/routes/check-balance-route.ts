import { Router } from 'express'
import { ServiceController } from '../controllers/service-controller'

export const checkBalanceServiceRouter = Router()

checkBalanceServiceRouter.get('/', ServiceController.checkBalance)