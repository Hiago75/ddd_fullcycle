import ProductFactory from "../../../domain/product/factory/product.factory";
import { ProductType } from "../create/create.product.dto";
import ListProductUseCase from "./list.product.usecase";

describe("Unit test for listing customer use case", () => {
  const product1 = ProductFactory.create(ProductType.A, "Product 1", 20)
  const product2 = ProductFactory.create(ProductType.B, "Product 2", 20)

  const MockRepository = () => {
    return {
      create: jest.fn(),
      find: jest.fn(),
      update: jest.fn(),
      findAll: jest.fn().mockReturnValue(Promise.resolve([product1, product2])),
    }
  }

  it("should list the products", async () => {
    const productRepository = MockRepository();
    const listProductUseCase = new ListProductUseCase(productRepository);

    const output = await listProductUseCase.execute({})

    expect(output.products.length).toBe(2)
    expect(output.products[0].id).toBe(product1.id);
    expect(output.products[0].name).toBe(product1.name);
    expect(output.products[0].price).toBe(product1.price);
    expect(output.products[1].id).toBe(product2.id);
    expect(output.products[1].name).toBe(product2.name);
    expect(output.products[1].price).toBe(product2.price);
  })
})