import Order from "../entity/Order";
import OrderItem from "../entity/OrderItem";
import OrderInterface from "../entity/order.interface";

interface OrderFactoryProps {
  id: string;
  customerId: string,
  items: {
    id: string,
    name: string,
    productId: string,
    quantity: number;
    price: number,
  }[]
}

export default class OrderFactory {
  public static create(props: OrderFactoryProps): OrderInterface {
    const items = props.items.map(item => {
      return new OrderItem(
        item.id,
        item.name,
        item.price,
        item.quantity,
        item.productId,
      )
    })

    return new Order(props.id, props.customerId, items)
  }
}