import Product from "./Product";

describe("Product unit tests", () => {
  it("should throw error when product id is empty", () => {
    expect(() => {
      new Product("", "Product 1", 100);
    }).toThrow('product: Product id is required')
  })

  it("should throw error when product name is empty", () => {
    expect(() => {
      new Product("123", "", 100);
    }).toThrow('product: Product name is required')
  })

  it("should throw error when product price is less than zero", () => {
    expect(() => {
      new Product("123", "Product 1", -1);
    }).toThrow('product: Product price must be greater than zero')
  })

  it("should throw error when product name is empty", () => {
    expect(() => {
      new Product("", "", 100);
    }).toThrow('product: Product id is required,product: Product name is required')
  })

  it("should change product name", () => {
    const product = new Product("123", "Product 1", 100);
    product.changeName("Product 2");

    expect(product.name).toBe("Product 2")
  })

  it("should change product price", () => {
    const product = new Product("123", "Product 1", 100);
    product.changePrice(150);

    expect(product.price).toBe(150)
  })
})