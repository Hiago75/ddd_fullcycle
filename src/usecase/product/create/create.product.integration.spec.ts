import { Sequelize } from "sequelize-typescript"
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model"
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository"
import CreateProductUseCase from "./create.product.usecase"
import { InputCreateProductDto, ProductType } from "./create.product.dto"

describe("Integration test for create product", () => {
  let sequelize: Sequelize, input: InputCreateProductDto

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true }
    })

    input = {
      type: ProductType.A,
      name: "Product 1",
      price: 20,
    }

    sequelize.addModels([ProductModel])
    await sequelize.sync();
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it("should create a product", async () => {
    const productRepository = new ProductRepository()
    const createProductUseCase = new CreateProductUseCase(productRepository)

    const result = await createProductUseCase.execute(input)

    const output = {
      id: expect.any(String),
      name: "Product 1",
      price: 20,
    }

    expect(result).toStrictEqual(output)
  })

  it("should create a type B product", async () => {
    const productRepository = new ProductRepository()
    const createProductUseCase = new CreateProductUseCase(productRepository)

    input.type = ProductType.B
    const result = await createProductUseCase.execute(input)

    const output = {
      id: expect.any(String),
      name: "Product 1",
      price: 21,
    }

    expect(result).toStrictEqual(output)
  })

  it("should throw an error when name is missing", async () => {
    const productRepository = new ProductRepository()
    const createProductUseCase = new CreateProductUseCase(productRepository)

    input.name = ""
    await expect(createProductUseCase.execute(input)).rejects.toThrow("Product name is required")
  })

  it("should throw an error when price is lower than 0", async () => {
    const productRepository = new ProductRepository()
    const createProductUseCase = new CreateProductUseCase(productRepository)

    input.price = -10
    await expect(createProductUseCase.execute(input)).rejects.toThrow("Product price must be greater than zero")
  })
})