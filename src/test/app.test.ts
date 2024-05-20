import request from "supertest";
import app from "../app";
import { cardType } from "../entities/transaction";
import Card from "../entities/card";
import { transactionService } from "../controllers/service-controller";
import 'express-async-errors'

const card = new Card("123456789012", "Augusto", "04/29", "362");

describe("POST => /transactions", () => {
  describe("Send VALID transaction data", () => {
    test("Should respond with a 201 status", async () => {
      const spyProcessTransaction = jest.spyOn(transactionService, 'processTransaction')
      const transaction = {
        value: 450,
        description: "Camisa do Flamengo",
        payMethod: cardType.debit,
        card: card,
      }
      const response = await request(app).post("/transactions").send(transaction);
      expect(response.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );
      expect(response.status).toBe(201);
      expect(spyProcessTransaction).toHaveBeenCalledWith(transaction)
      expect(response.body.message).toBe("transaction process ok");
    });
  });
  describe("Send INVALID TRANSACTION", () => {
    test("Should respond with 422 status for WRONG VALUE", async () => {
      const bodyData = [
        {
          value: "",
          description: "Camisa do Flamengo",
          payMethod: cardType.debit,
          card: card,
        },
        {
          value: -5,
          description: "Camisa do Flamengo",
          payMethod: cardType.debit,
          card: card,
        },
        {
          description: "Camisa do Flamengo",
          payMethod: cardType.debit,
          card: card,
        },
      ];
      for (const transaction of bodyData) {
        const response = await request(app)
        .post("/transactions")
        .send(transaction);

        expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"))
        expect(response.status).toBe(422)
        expect(response.error).not.toBe(false)
        expect(response.text).toContain('You should provide valid data')
        expect(response.text).toContain('invalid value')
      }
    });
    test("Should respond with 422 status for WRONG DESCRIPTION", async () => {
      const bodyData = [
        {
          value: 450,
          description: "",
          payMethod: cardType.debit,
          card: card,
        },
        {
          value: 5,
          description: "C",
          payMethod: cardType.debit,
          card: card,
        },
        {
          value: 450,
          payMethod: cardType.debit,
          card: card,
        },
      ];
      for (const transaction of bodyData) {
        const response = await request(app)
        .post("/transactions")
        .send(transaction);

        expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"))
        expect(response.status).toBe(422)
        expect(response.error).not.toBe(false)
        expect(response.text).toContain('You should provide valid data')
        expect(response.text).toContain('invalid description')

      }
    });
    test("Should respond with 422 status for WRONG PAYMETHOD", async () => {
      const bodyData = [
        {
          value: 450,
          description: "Some funny description",
          payMethod: "any",
          card: card,
        },
        {
          value: 10,
          description: "Some funny description",
          card: card,
        },
      ];
      for (const transaction of bodyData) {
        const response = await request(app)
        .post("/transactions")
        .send(transaction);

        expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"))
        expect(response.status).toBe(422)
        expect(response.error).not.toBe(false)
        expect(response.text).toContain('You should provide valid data')
        expect(response.text).toContain("invalid payMethod")

      }
});
    describe("Should respond with 422 status for WRONG CARD VALUES", () => {
      test("invalid CARD NUMBER", async () => {
        const bodyData = [
          {
            value: 450,
            description: "any description",
            payMethod: cardType.debit,
            card: {
              number: "12345678",
              owner: "Augusto",
              expiration: "04/29",
              cvv: "362",
            },
          },
          {
            value: 450,
            description: "any description",
            payMethod: cardType.debit,
            card: {
              owner: "Augusto",
              expiration: "04/29",
              cvv: "362",
            },
          },
        ];
        for (const transaction of bodyData) {
          const response = await request(app)
          .post("/transactions")
          .send(transaction);
  
          expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"))
          expect(response.status).toBe(422)
          expect(response.error).not.toBe(false)
          expect(response.text).toContain('You should provide valid data')
          expect(response.text).toContain("invalid card number")
        }
      });
      test("invalid CARD OWNER", async () => {
        const bodyData = [
          {
            value: 450,
            description: "any description",
            payMethod: cardType.debit,
            card: {
              number: "123456789012",
              owner: " ",
              expiration: "04/29",
              cvv: "362",
            },
          },
          {
            value: 450,
            description: "any description",
            payMethod: cardType.debit,
            card: {
              number: "123456789012",
              expiration: "04/29",
              cvv: "362",
            },
          },
          {
            value: 450,
            description: "any description",
            payMethod: cardType.debit,
            card: {
              number: "123456789012",
              owner: "a",
              expiration: "04/29",
              cvv: "362",
            },
          },
        ];
        for (const transaction of bodyData) {
          const response = await request(app)
          .post("/transactions")
          .send(transaction);
  
          expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"))
          expect(response.status).toBe(422)
          expect(response.error).not.toBe(false)
          expect(response.text).toContain('You should provide valid data')
          expect(response.text).toContain("invalid card owner")
        }
      });
      test("invalid CARD EXPIRATION", async () => {
        const bodyData = [
          {
            value: 450,
            description: "any description",
            payMethod: cardType.debit,
            card: {
              number: "123456789012",
              owner: "Augusto",
              expiration: "13/29",
              cvv: "362",
            },
          },
          {
            value: 450,
            description: "any description",
            payMethod: cardType.debit,
            card: {
              number: "123456789012",
              owner: "Augusto",
              expiration: "",
              cvv: "362",
            },
          },
          {
            value: 450,
            description: "any description",
            payMethod: cardType.debit,
            card: {
              number: "123456789012",
              owner: "Augusto",
              cvv: "362",
            },
          },
        ];
        for (const transaction of bodyData) {
          const response = await request(app)
          .post("/transactions")
          .send(transaction);
  
          expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"))
          expect(response.status).toBe(422)
          expect(response.error).not.toBe(false)
          expect(response.text).toContain('You should provide valid data')
          expect(response.text).toContain("invalid card expiration")
        }
      });
    });
  });
});

describe("GET => /transactions", () => {
  test("Should respond with array containing Transaction and 200 status", async () => {
    const result = [
      {
        value: 450,
        description: "Camisa do Flamengo",
        payMethod: cardType.debit,
        card: {
          cvv: "362",
          expiration: "04/29",
          number: "****.****.****.9012",
          owner: "Augusto",
        },
      },
    ]
    const spyGetTransactions = jest.spyOn(transactionService, 'getTransactions')
    spyGetTransactions.mockResolvedValue(result)
    try {
      const response = await request(app).get("/transactions");
      expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
      expect(response.status).toBe(200);
      expect(spyGetTransactions).toHaveBeenCalledTimes(1)
      expect(response.body).toEqual(expect.objectContaining({transactions: expect.arrayContaining(result)}));      
    } catch (error) {
      expect(error).toBeUndefined()
    }    
  });
});

describe("GET => /check-balance", ()=>{
  test('Should return 200 status and a BALANCE containing AVAILABLE and WAITING FUNDS', async ()=>{
    const spyCheckBalance = jest.spyOn(transactionService, 'checkBalance')
    spyCheckBalance.mockResolvedValue({ available: 10, waiting: 20 })
    try {
        const response = await request(app).get('/check-balance')
        const balance = response.body        
        expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
        expect(response.status).toBe(200)
        expect(spyCheckBalance).toHaveBeenCalledTimes(1)
        expect(balance).toBeDefined()
        expect(balance).toHaveProperty('available')
        expect(balance).toHaveProperty('waiting')
    } catch (error) {
        expect(error).toBeUndefined()
    }
  })
})
