import Order from "../../domain/entity/Order";
import OrderItem from "../../domain/entity/OrderItem";
import OrderRepositoryInterface from "../../domain/repository/order.repository.interface";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderModel from "../db/sequelize/model/order.model";

export default class OrderRepository implements OrderRepositoryInterface {
  async create(entity: Order): Promise<void> {
    await OrderModel.create({
      id: entity.id,
      customer_id: entity.customerId,
      total: entity.getTotal(),
      items: entity.items.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        product_id: item.productId,
        quantity: item.quantity
      }))
    },
      {
        include: [{ model: OrderItemModel }]
      }
    )
  }

  async update(entity: Order): Promise<void> {
    await OrderModel.update(
      {
        id: entity.id,
        customerId: entity.customerId,
        items: entity.items,
        total: entity.getTotal()
      },
      {
        where: {
          id: entity.id,
        },
      }
    )
  }

  async find(id: string): Promise<Order> {
    let orderModel;

    try {
      orderModel = await OrderModel.findOne({
        where: { id },
        rejectOnEmpty: true,
        include: [{ model: OrderItemModel }]
      })
    } catch (error) {
      throw new Error("Order not found")
    }

    const orderItems = orderModel.items.map(item => new OrderItem(
      item.id,
      item.name,
      item.price,
      item.quantity,
      item.product_id
    ))

    return new Order(
      orderModel.id,
      orderModel.customer_id,
      orderItems
    )
  }
  async findAll(): Promise<Order[]> {
    const orderModels = await OrderModel.findAll({
      include: [{ model: OrderItemModel }]
    })

    return orderModels.map(model => {
      const orderItems = model.items.map(item => new OrderItem(
        item.id,
        item.name,
        item.price,
        item.quantity,
        item.product_id,
      ))

      const order = new Order(
        model.id,
        model.customer_id,
        orderItems,
      )

      return order
    })
  }
}