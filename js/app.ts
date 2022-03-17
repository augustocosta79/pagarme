import express from 'express'
import cors from 'cors'
import logger from 'morgan'
import { router } from './routes'

export const app = express()

app.use(express.json()) // permite reconhecer o corpo das requisiçoes em formato json
app.use(cors()) // abre todas as portas, mas dá pra configurar filtros
app.use(logger('dev')) // loga as requisições feitas à api


// integrando as rotas

app.use('/', router)