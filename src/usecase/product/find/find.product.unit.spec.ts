import Product from "../../../domain/product/entity/Product"
import FindProductUseCase from "./find.product.usecase"

describe("Unit test find product use case", () => {
  const product = new Product("123", "Product 1", 20.00)

  const MockRepository = () => {
    return {
      find: jest.fn().mockReturnValue(Promise.resolve(product)),
      findAll: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    }
  }

  it("should find a product", async () => {
    const productRepository = MockRepository();
    const findProductUseCase = new FindProductUseCase(productRepository)

    const input = { id: "123" }

    const output = {
      id: "123",
      name: "Product 1",
      price: 20.00,
    }

    const result = await findProductUseCase.execute(input)

    expect(result).toStrictEqual(output)
  })

  it("should not find a product", async () => {
    const productRepository = MockRepository();
    productRepository.find.mockImplementation(() => {
      throw new Error("Product not found")
    })

    const findProductUseCase = new FindProductUseCase(productRepository)

    const input = { id: "123" }

    expect(() => {
      return findProductUseCase.execute(input)
    }).rejects.toThrow("Product not found")
  })
})