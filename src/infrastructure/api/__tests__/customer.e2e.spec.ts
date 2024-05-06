import { app, sequelize } from "../express"
import request from "supertest"

describe("E2E test for customer", () => {

  beforeEach(async () => {
    await sequelize.sync({ force: true })
  })

  afterAll(async () => {
    await sequelize.close()
  })

  it("should create a customer", async () => {
    const response = await request(app)
      .post("/customer")
      .send({
        name: "John",
        address: {
          city: "City",
          street: "Street",
          number: 123,
          zip: "12345"
        }
      })

    expect(response.status).toBe(201)
    expect(response.body.name).toBe("John")
    expect(response.body.address.street).toBe('Street')
    expect(response.body.address.city).toBe('City')
    expect(response.body.address.number).toBe(123)
    expect(response.body.address.zip).toBe('12345')
  });

  it("should not create a customer", async () => {
    const response = await request(app)
      .post("/customer")
      .send({
        name: "John",
      })

    expect(response.status).toBe(500)
  })

  it("should list all customers", async () => {
    const response = await request(app)
      .post("/customer")
      .send({
        name: "John",
        address: {
          city: "City",
          street: "Street",
          number: 123,
          zip: "12345"
        }
      })

    expect(response.status).toBe(201)

    const response2 = await request(app)
      .post("/customer")
      .send({
        name: "Jane",
        address: {
          city: "City 2",
          street: "Street 2",
          number: 1234,
          zip: "123456"
        }
      })

    expect(response2.status).toBe(201)

    const listReponse = await request(app)
      .get("/customer")
      .send();

    expect(listReponse.status).toBe(200)
    expect(listReponse.body.customers.length).toBe(2)
    const customer1 = listReponse.body.customers[0]
    expect(customer1.name).toBe("John")
    expect(customer1.address.street).toBe("Street")
    const customer2 = listReponse.body.customers[1]
    expect(customer2.name).toBe("Jane")
    expect(customer2.address.street).toBe("Street 2")

    const listReponseXml = await request(app)
      .get('/customer')
      .set("Accept", "application/xml")
      .send()

    expect(listReponseXml.status).toBe(200)
    expect(listReponseXml.text).toContain(`<?xml version="1.0" encoding="UTF-8"?>`)
    expect(listReponseXml.text).toContain(`<customers>`)
    expect(listReponseXml.text).toContain(`<customer>`)
    expect(listReponseXml.text).toContain(`<name>John</name>`)
    expect(listReponseXml.text).toContain(`<address>`)
    expect(listReponseXml.text).toContain(`<street>Street</street>`)
    expect(listReponseXml.text).toContain(`</address>`)
    expect(listReponseXml.text).toContain(`</customer>`)
    expect(listReponseXml.text).toContain(`<customer>`)
    expect(listReponseXml.text).toContain(`<name>Jane</name>`)
    expect(listReponseXml.text).toContain(`<address>`)
    expect(listReponseXml.text).toContain(`<street>Street 2</street>`)
    expect(listReponseXml.text).toContain(`</address>`)
    expect(listReponseXml.text).toContain(`</customer>`)

  })
})