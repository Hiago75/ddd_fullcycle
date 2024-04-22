import { app, sequelize } from "../express"
import request from "supertest"

describe("E2E test for customer", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true })
  })

  afterAll(async () => {
    await sequelize.close()
  })

  it("should create a product", async () => {
    const response = await request(app)
      .post("/product")
      .send({
        name: "John",
        price: 20
      })

    expect(response.status).toBe(201)
    expect(response.body.name).toBe("John")
    expect(response.body.price).toBe(20)
  })
})