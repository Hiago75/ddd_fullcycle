import OrderItem from "./OrderItem";

export default interface OrderInterface {
  get id(): string,
  get customerId(): string,
  get items(): OrderItem[]
  getTotal(): number;
}