import Order from "../../../../domain/checkout/entity/Order";
import OrderItem from "../../../../domain/checkout/entity/OrderItem";
import OrderRepositoryInterface from "../../../../domain/checkout/repository/order.repository.interface";
import OrderItemModel from "./order-item.model";
import OrderModel from "./order.model";

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
    const sequelize = OrderModel.sequelize;
    await sequelize.transaction(async (transaction) => {

      await OrderItemModel.destroy({
        where: { order_id: entity.id },
        transaction,
      });

      const items = entity.items.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        product_id: item.productId,
        quantity: item.quantity,
        order_id: entity.id,
      }));

      await OrderItemModel.bulkCreate(items, { transaction });

      await OrderModel.update(
        { total: entity.getTotal() },
        { where: { id: entity.id }, transaction }
      );

    });
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