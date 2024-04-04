import supertest from "supertest";
import app from "../app";
import { cardType } from "../entities/transaction";
import Card from "../entities/card";

const card = new Card("12345678", "Augusto", "04/29", "362");

describe("POST transactions/new-transaction", ()=>{

  describe("Testing route with VALID transaction data", ()=>{
    test("Should respond with a 201 status", async () => {
      const response = await supertest
        .agent(app)
        .post("/transactions/new-transaction")
        .send({
          value: 450,
          description: "Camisa do Flamengo",
          payMethod: cardType.debit,
          card: card,
        });
      expect(response.status).toBe(201);
      expect(response.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );
      expect(response.body.message).toBe("transaction process ok");
    });
  })
 })
 describe("Testing route with INVALID transaction data", ()=>{
   test("Should respond with 422 status", async () => {
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
       const response = await supertest
         .agent(app)
         .post("/transactions/new-transaction")
         .send(transaction);
       expect(response.status).toBe(422);
       expect(response.body.message).toBe("invalid value");    
     }
   });
 })
