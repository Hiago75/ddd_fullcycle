import { InputCreateProductDto, ProductType } from "./create.product.dto"
import CreateProductUseCase from "./create.product.usecase"

describe("Unit test create product use case", () => {
  let input: InputCreateProductDto

  beforeEach(() => {
    input = {
      type: ProductType.A,
      name: "Product",
      price: 20
    }
  })

  const MockRepository = () => {
    return {
      find: jest.fn(),
      findAll: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    }
  }

  it("should create a product", async () => {
    const productRepository = MockRepository();
    const createProductUseCase = new CreateProductUseCase(productRepository);

    const output = await createProductUseCase.execute(input);

    expect(output).toStrictEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price,
    })
  })

  it("should create a product of type B", async () => {
    const productRepository = MockRepository();
    const createProductUseCase = new CreateProductUseCase(productRepository);

    input.type = ProductType.B
    const output = await createProductUseCase.execute(input);

    expect(output).toStrictEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price + 1,
    })
  })

  it("should throw an error when name is missing", async () => {
    const productRepository = MockRepository();
    const createProductUseCase = new CreateProductUseCase(productRepository);

    input.name = ""
    await expect(createProductUseCase.execute(input))
      .rejects.toThrow("Name is required");
  })

  it("should throw an error when price lower than 0", async () => {
    const productRepository = MockRepository();
    const createProductUseCase = new CreateProductUseCase(productRepository);

    input.price = -10;
    await expect(createProductUseCase.execute(input))
      .rejects.toThrow("price must be a positive number");
  })
})