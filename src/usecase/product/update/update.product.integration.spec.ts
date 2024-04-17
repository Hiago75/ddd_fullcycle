import { Sequelize } from "sequelize-typescript"
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model"
import { InputUpdateProductDto } from "./update.product.dto"
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository"
import UpdateProductUseCase from "./update.product.usecase"
import Product from "../../../domain/product/entity/Product"

describe("Integration test for update product", () => {
  let sequelize: Sequelize, input: InputUpdateProductDto

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true }
    })

    input = {
      id: "123",
      name: "Updated Product",
      price: 40,
    }

    sequelize.addModels([ProductModel])
    await sequelize.sync();
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it("should update a product", async () => {
    const productRepository = new ProductRepository();
    const updateProductUseCase = new UpdateProductUseCase(productRepository)
    const product = new Product("123", "Product", 40)

    await productRepository.create(product);

    const output = await updateProductUseCase.execute(input)

    expect(input).toStrictEqual(output)
  })

  it("should not update a product with an invalid id", async () => {
    const productRepository = new ProductRepository();
    const updateProductUseCase = new UpdateProductUseCase(productRepository)
    const product = new Product("1234", "Product", 40)

    await productRepository.create(product);

    await expect(updateProductUseCase.execute(input)).rejects.toThrow("Product not found")
  })

  it("should not update a customer name to an empty one", async () => {
    const productRepository = new ProductRepository();
    const updateProductUseCase = new UpdateProductUseCase(productRepository)
    const product = new Product("123", "Product", 40)

    await productRepository.create(product);
    input.name = ""

    await expect(updateProductUseCase.execute(input)).rejects.toThrow("Product name is required")
  })

  it("should not update a customer price to lower than 0", async () => {
    const productRepository = new ProductRepository();
    const updateProductUseCase = new UpdateProductUseCase(productRepository)
    const product = new Product("123", "Product", 40)

    await productRepository.create(product);
    input.price = -10

    await expect(updateProductUseCase.execute(input)).rejects.toThrow("Product price must be greater than zero")
  })
})