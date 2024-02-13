import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../db/sequelize/model/customer.model";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderModel from "../db/sequelize/model/order.model";
import ProductModel from "../db/sequelize/model/product.model";
import CustomerRepository from "./customer.repository";
import Customer from "../../domain/entity/Customer";
import Address from "../../domain/entity/Address";
import Product from "../../domain/entity/Product";
import ProductRepository from "./product.repository";
import OrderItem from "../../domain/entity/OrderItem";
import Order from "../../domain/entity/Order";
import OrderRepository from "./order.repository";

describe("Customer repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([CustomerModel, OrderModel, OrderItemModel, ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a new order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Nome 1");
    const address = new Address("Rua Teste", 123, "123456-098", "Cidade");
    customer.changeAddress(address);
    await customerRepository.create(customer)

    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 10)
    await productRepository.create(product)

    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      2,
      product.id,
    )

    const order = new Order("123", customer.id, [orderItem])

    const orderRepository = new OrderRepository();
    await orderRepository.create(order)

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"]
    })

    expect(orderModel.toJSON()).toStrictEqual({
      id: "123",
      customer_id: "123",
      total: order.getTotal(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          product_id: "123",
          order_id: "123",
        }
      ]
    })
  })

  it("should update a order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Nome 1");
    const address = new Address("Rua Teste", 123, "123456-098", "Cidade");
    customer.changeAddress(address);
    await customerRepository.create(customer)

    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 10)
    await productRepository.create(product)

    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      2,
      product.id,
    )

    const order = new Order("123", customer.id, [orderItem])

    const orderItem2 = new OrderItem(
      "2",
      product.name,
      product.price,
      3,
      product.id,
    )

    const orderItem3 = new OrderItem(
      "3",
      product.name,
      product.price,
      1,
      product.id,
    )


    order.insertOrderItems(orderItem2, orderItem3)

    const orderRepository = new OrderRepository();
    orderRepository.create(order);
    await orderRepository.update(order)
    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"]
    })

    expect(orderModel.toJSON()).toStrictEqual({
      id: "123",
      customer_id: "123",
      total: order.getTotal(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          product_id: "123",
          order_id: "123",
        },
        {
          id: orderItem2.id,
          name: orderItem2.name,
          price: orderItem2.price,
          quantity: orderItem2.quantity,
          product_id: "123",
          order_id: "123",
        },
        {
          id: orderItem3.id,
          name: orderItem3.name,
          price: orderItem3.price,
          quantity: orderItem3.quantity,
          product_id: "123",
          order_id: "123",
        }
      ]
    })
  })

  it("should not find a inexistant order", async () => {
    const orderRepository = new OrderRepository();

    await expect(async () => {
      await orderRepository.find("321312")
    }).rejects.toThrow("Order not found");
  })

  it("should find a onder", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Nome 1");
    const address = new Address("Rua Teste", 123, "123456-098", "Cidade");
    customer.changeAddress(address);
    await customerRepository.create(customer)

    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 10)
    await productRepository.create(product)

    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      2,
      product.id,
    )

    const order = new Order("123", customer.id, [orderItem])

    const orderRepository = new OrderRepository();
    await orderRepository.create(order)

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"]
    })

    const foundOrder = await orderRepository.find("123");

    expect(foundOrder.items).toHaveLength(1);
    expect(orderModel.toJSON()).toStrictEqual({
      id: foundOrder.id,
      customer_id: foundOrder.customerId,
      total: foundOrder.getTotal(),
      items: [
        {
          id: foundOrder.items[0].id,
          name: foundOrder.items[0].name,
          product_id: foundOrder.items[0].productId,
          price: foundOrder.items[0].price,
          quantity: foundOrder.items[0].quantity,
          order_id: foundOrder.id
        }
      ]
    })
  })

  it("should find all orders", async () => {
    const customerRepository = new CustomerRepository();
    const customer1 = new Customer("123", "Nome 1");
    const address1 = new Address("Rua Teste", 123, "123456-098", "Cidade");
    customer1.changeAddress(address1);
    await customerRepository.create(customer1)

    const productRepository = new ProductRepository();
    const product1 = new Product("123", "Product 1", 10)
    await productRepository.create(product1)

    const orderItem1 = new OrderItem(
      "1",
      product1.name,
      product1.price,
      2,
      product1.id,
    )

    const orderRepository = new OrderRepository();

    const order1 = new Order("123", customer1.id, [orderItem1])
    await orderRepository.create(order1)

    const customer2 = new Customer("456", "Nome 2");
    const address2 = new Address("Rua Teste 2", 456, "123456-098", "Cidade 2");
    customer2.changeAddress(address2);
    await customerRepository.create(customer2)

    const product2 = new Product("456", "Product 2", 10)
    await productRepository.create(product2)

    const orderItem2 = new OrderItem(
      "2",
      product2.name,
      product2.price,
      2,
      product2.id,
    )

    const order2 = new Order("456", customer2.id, [orderItem2])
    await orderRepository.create(order2);

    const orders = await orderRepository.findAll();

    expect(orders).toHaveLength(2);
    expect(orders).toContainEqual(order1);
    expect(orders).toContainEqual(order2)
  })
});