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
        name: "Product 1",
        price: 20
      })

    expect(response.status).toBe(201)
    expect(response.body.name).toBe("Product 1")
    expect(response.body.price).toBe(20)
  })

  it("should not create a product", async () => {
    const response = await request(app)
      .post("/product")
      .send({
        name: "Product 1",
      })


    expect(response.status).toBe(500)
  })

  it("should list all products", async () => {
    const response = await request(app)
      .post("/product")
      .send({
        name: "Product 1",
        price: 20
      })
    expect(response.status).toBe(201)

    const response2 = await request(app)
      .post("/product")
      .send({
        name: "Product 2",
        price: 40
      })
    expect(response2.status).toBe(201)

    const listResponse = await request(app)
      .get("/product")
      .send()

    expect(listResponse.status).toBe(200)
    expect(listResponse.body.products.length).toBe(2)

    const product1 = listResponse.body.products[0]
    expect(product1.name).toBe("Product 1")
    expect(product1.price).toBe(20)

    const product2 = listResponse.body.products[1]
    expect(product2.name).toBe("Product 2")
    expect(product2.price).toBe(40)
  })

  it("should find a product", async () => {
    const response = await request(app)
      .post("/product")
      .send({
        name: "Product 1",
        price: 20
      })
    expect(response.status).toBe(201)

    const productId = response.body.id;

    const findResponse = await request(app)
      .get(`/product/${productId}`)
      .send()

    expect(findResponse.status).toBe(200)
    expect(findResponse.body.name).toBe("Product 1")
    expect(findResponse.body.price).toBe(20)
  })

  it("should find a product", async () => {
    const response = await request(app)
      .post("/product")
      .send({
        name: "Product 1",
        price: 20
      })
    expect(response.status).toBe(201)

    const productId = response.body.id;

    const findResponse = await request(app)
      .get(`/product/${productId}`)
      .send()

    expect(findResponse.status).toBe(200)
    expect(findResponse.body.name).toBe("Product 1")
    expect(findResponse.body.price).toBe(20)
  })

  it("should not find a product", async () => {
    const productId = "1234";

    const findResponse = await request(app)
      .get(`/product/${productId}`)
      .send()

    expect(findResponse.status).toBe(500)
  })

  it("should update a product's name", async () => {
    const response = await request(app)
      .post("/product")
      .send({
        name: "Product 1",
        price: 20
      })
    expect(response.status).toBe(201)

    const productId = response.body.id;

    const updateResponse = await request(app)
      .put("/product")
      .send({
        id: productId,
        name: "Product updated",
        price: 20
      })

    expect(updateResponse.status).toBe(200)
    expect(updateResponse.body.name).toBe("Product updated")
    expect(updateResponse.body.price).toBe(response.body.price)
  })


  it("should update a product's price", async () => {
    const response = await request(app)
      .post("/product")
      .send({
        name: "Product 1",
        price: 20
      })
    expect(response.status).toBe(201)

    const productId = response.body.id;

    const updateResponse = await request(app)
      .put("/product")
      .send({
        id: productId,
        name: "Product 1",
        price: 30,
      })

    expect(updateResponse.status).toBe(200)
    expect(updateResponse.body.name).toBe(response.body.name)
    expect(updateResponse.body.price).toBe(30)
  })

  it("should update a product", async () => {
    const response = await request(app)
      .post("/product")
      .send({
        name: "Product 1",
        price: 20
      })
    expect(response.status).toBe(201)

    const productId = response.body.id;

    const updateResponse = await request(app)
      .put("/product")
      .send({
        id: productId,
        name: "Product updated",
        price: 30,
      })

    expect(updateResponse.status).toBe(200)
    expect(updateResponse.body.name).toBe("Product updated")
    expect(updateResponse.body.price).toBe(30)
  })

  it("should not update a product", async () => {
    const productId = "1234";

    const updateResponse = await request(app)
      .put(`/product/`)
      .send({
        id: productId,
        name: "Product updated",
        price: 30,
      })

    expect(updateResponse.status).toBe(500)
  })

  it("should not allow to update a product to an empty name", async () => {
    const response = await request(app)
      .post("/product")
      .send({
        name: "Product 1",
        price: 20
      })
    expect(response.status).toBe(201)

    const productId = response.body.id;

    const updateResponse = await request(app)
      .put("/product")
      .send({
        id: productId,
        name: "",
        price: 30,
      })

    expect(updateResponse.status).toBe(500)
  })

  it("should not allow to update a product to a price lower than 0", async () => {
    const response = await request(app)
      .post("/product")
      .send({
        name: "Product 1",
        price: 20
      })
    expect(response.status).toBe(201)

    const productId = response.body.id;

    const updateResponse = await request(app)
      .put("/product")
      .send({
        id: productId,
        name: "Product 1",
        price: -10,
      })

    expect(updateResponse.status).toBe(500)
  })
})