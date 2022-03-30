import { Router } from 'express'
import { clientControl } from './pagarme'

export const router = Router()

// clientctrl.LoggedClients[0].cashIn(150, 'testando objeto', 'debit_card', '1888112201035875', 'Eu', '11/28', 382)
// clientctrl.LoggedClients[1].cashIn(3000, 'testando objeto', 'debit_card', '1888112201035875', 'Eu', '11/28', 382)


router.get('/transactions/:id', (req, res) => {
    let { id } = req.params
    res.json(clientControl.clientTransactions(id))
})

router.post('/cashin/:id', (req, res) => {
    const { value, description,
        payment, ccnumber, ccowner,
        ccexpire, cccvv } = req.body
    const { id } = req.params
    clientControl.clientCashin(id, value, description,
        payment, ccnumber, ccowner,
        ccexpire, cccvv)
    res.json({mensagem:'depósito realizado!'})
})

router.get('/funds/:id', (req, res) => {
    let { id } = req.params
    res.json(clientControl.clientFunds(id))
})