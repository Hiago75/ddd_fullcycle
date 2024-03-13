import Address from "../value-object/Address";
import CustomerFactory from "./customer.factory";

describe("Customer factory unit test", () => {
  it("should create a customer", () => {
    const customer = CustomerFactory.create("João")

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("João")
    expect(customer.Address).toBeUndefined()
  })

  it("should create a customer with an address", () => {
    const address = new Address("Rua", 123, "00000-000", "Cidade");
    const customer = CustomerFactory.createWithAddress("João", address)

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("João")
    expect(customer.Address).toBe(address)
  })
})