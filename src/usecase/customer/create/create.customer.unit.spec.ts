import CreateCustomerUseCase from "./create.customer.usecase"

describe("Unit test create customer use case", () => {
  const input = {
    name: "John",
    address: {
      street: "Street",
      number: 123,
      zip: "Zip",
      city: "City"
    }
  }

  const MockRepository = () => {
    return {
      find: jest.fn(),
      findAll: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    }
  }

  it("Should create a customer", async () => {
    const customerRepository = MockRepository();
    const customerCreateUseCase = new CreateCustomerUseCase(customerRepository)

    const output = await customerCreateUseCase.execute(input)

    expect(output).toStrictEqual({
      id: expect.any(String),
      name: input.name,
      address: {
        street: input.address.street,
        number: input.address.number,
        zip: input.address.zip,
        city: input.address.city
      }
    })
  })

  it("Should throw an erro when name is missing", async () => {
    const customerRepository = MockRepository();
    const customerCreateUseCase = new CreateCustomerUseCase(customerRepository)

    input.name = "";

    await expect(customerCreateUseCase.execute(input)).rejects.toThrow("Name is required")
  })

  it("Should throw an erro when name is missing", async () => {
    const customerRepository = MockRepository();
    const customerCreateUseCase = new CreateCustomerUseCase(customerRepository)

    input.address.street = "";

    await expect(customerCreateUseCase.execute(input)).rejects.toThrow("Street is required")
  })
})