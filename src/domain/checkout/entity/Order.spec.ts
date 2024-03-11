import Order from "./Order"
import OrderItem from "./OrderItem";

describe("Order unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      new Order("", "123", []);
    }).toThrow('Id is required')
  })

  it("should throw error when customer id is empty", () => {
    expect(() => {
      new Order("123", "", []);
    }).toThrow('Customer id is required')
  })

  it("should throw error when customer id is empty", () => {
    expect(() => {
      new Order("123", "123", []);
    }).toThrow('Items are required')
  })

  it("should calculate total", () => {
    const item = new OrderItem("1", "Item 1", 100, 2, "p1");
    const item2 = new OrderItem("2", "Item 2", 150, 3, "p2");

    const order = new Order("123", "123", [item]);

    expect(order.getTotal()).toBe(200)

    const order2 = new Order("123", "123", [item, item2])
    expect(order2.getTotal()).toBe(650)
  })

  it("should throw error if item quantity is greater than or equals to 0", () => {


    expect(() => {
      const item = new OrderItem("1", "Item 1", 100, 0, "p1");
      new Order("123", "123", [item]);

    }).toThrow("Quantity must be greater than 0")
  })
})