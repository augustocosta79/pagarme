import * as supertest from 'supertest'
import app from '../app'
import { cardType } from '../entities/transaction';
import Card from '../entities/card';

const card = new Card('12345678', 'Augusto','04/29', '362')


test('Should respond with a 201 status getting a valid transaction', async () => {
    const response = await supertest.agent(app).post("/transactions/new-transaction").send({ 
        value: 450,
        description: 'Camisa do Flamengo',
        payMethod: cardType.debit,
        card: card,
    });
    expect(response.status).toBe(201);
    expect(response.body.message).toBe("transaction process ok")
  })