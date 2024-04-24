import Address from "../value-object/Address";
import Customer from "./Customer";

describe("Customer unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      new Customer("", "John");
    }).toThrow("Id is required")
  })

  it("should throw error when name is empty", () => {
    expect(() => {
      new Customer("Id", "");
    }).toThrow("customer: Name is required")
  })

  it("should throw error when id and name are empty", () => {
    expect(() => {
      new Customer("", "");
    }).toThrow("customer: Id is required,customer: Name is required")
  })


  it("should change name", () => {
    const customer = new Customer("123", "John");

    customer.changeName("Jane");

    expect(customer.name).toBe("Jane")
  })

  it("should throw error trying to set a empty name", () => {
    const customer = new Customer("123", "John");

    expect(() => {
      customer.changeName("");
    }).toThrow("customer: Name is required")
  })


  it("should activate customer", () => {
    const customer = new Customer("123", "John");
    const address = new Address("Street 1", 123, "12345-678", "São Paulo")
    customer.Address = address;

    customer.activate();

    expect(customer.isActive()).toBe(true)
  })

  it("should deactivate customer", () => {
    const customer = new Customer("123", "John");

    customer.deactivate();

    expect(customer.isActive()).toBe(false)
  })


  it("should throw error when trying to activate a user without a address", () => {
    const customer = new Customer("123", "John");

    expect(() => {
      customer.activate();
    }).toThrow("Address is mandatory to activate a customer")
  })

  it("should add reward points", () => {
    const customer = new Customer("1", "Customer 1")
    expect(customer.rewardPoints).toBe(0);

    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(10);

    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(20)
  })
});