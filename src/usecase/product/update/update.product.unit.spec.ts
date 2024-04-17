import ProductFactory from "../../../domain/product/factory/product.factory"
import { ProductType } from "../create/create.product.dto"
import { InputUpdateProductDto } from "./update.product.dto";
import UpdateProductUseCase from "./update.product.usecase";

describe("Unit test for product update use case", () => {
  let input: InputUpdateProductDto

  const product = ProductFactory.create(ProductType.A, "Product 1", 20);
  const MockRepository = () => {
    return {
      find: jest.fn().mockReturnValue(Promise.resolve(product)),
      findAll: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    }
  }

  beforeEach(() => {
    input = {
      id: product.id,
      name: "Updated Product",
      price: 40,
    }
  })

  it("should update a customer", async () => {
    const productRepository = MockRepository();
    const updateProductUseCase = new UpdateProductUseCase(productRepository)

    const output = await updateProductUseCase.execute(input)

    expect(output).toEqual(input)
  })

  it("should not update a customer name to an empty one", async () => {
    const productRepository = MockRepository();
    const updateProductUseCase = new UpdateProductUseCase(productRepository)

    input.name = ""
    await expect(updateProductUseCase.execute(input)).rejects.toThrow("Product name is required")
  })

  it("should not update a customer price to lower than 0", async () => {
    const productRepository = MockRepository();
    const updateProductUseCase = new UpdateProductUseCase(productRepository)

    input.price = -10
    await expect(updateProductUseCase.execute(input)).rejects.toThrow("Product price must be greater than zero")
  })

  it("should not update a customer with an invalid id", async () => {
    const productRepository = MockRepository();
    productRepository.find.mockImplementation(() => {
      throw new Error("Product not found")
    })

    const updateProductUseCase = new UpdateProductUseCase(productRepository)

    await expect(updateProductUseCase.execute(input)).rejects.toThrow("Product not found")
  })
}) 