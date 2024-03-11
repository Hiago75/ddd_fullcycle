import Customer from "../../customer/entity/Customer"
import Order from "../entity/Order"
import OrderItem from "../entity/OrderItem"
import OrderService from "./order.service"

describe("Order service unit tests", () => {
  it("should place an order", () => {
    const customer = new Customer("c1", "Customer 1")
    const item1 = new OrderItem("i1", "Item 1", 10, 1, "p1")

    const order = OrderService.placeOrder(customer, [item1]);

    expect(customer.rewardPoints).toBe(5);
    expect(order.getTotal()).toBe(10);
  })

  it("should get total of all orders", () => {
    const orderItem = new OrderItem("i1", "Item 1", 100, 1, "p1")
    const orderItem2 = new OrderItem("i2", "Item 2", 200, 2, "p2")

    const order = new Order("o1", "c1", [orderItem]);
    const order2 = new Order("o2", "c1", [orderItem2]);

    const total = OrderService.total([order, order2]);

    expect(total).toBe(500)
  })
})