import OrderItem from "./OrderItem";

export default class Order {
  private _id: string;
  private _customerId: string;
  private _items: OrderItem[] = [];
  private _total: number;

  constructor(id: string, customerId: string, items: OrderItem[]) {
    this._id = id;
    this._customerId = customerId;
    this._items = items;
    this._total = this.getTotal();

    this.validate();
  }

  get id() {
    return this._id;
  }

  get customerId(): string {
    return this._customerId
  }

  get items(): OrderItem[] {
    return this._items
  }

  validate() {
    if (this._id.length === 0) {
      throw new Error("Id is required")
    }

    if (this._customerId.length === 0) {
      throw new Error("Customer id is required")
    }

    if (this._items.length === 0) {
      throw new Error("Items are required")
    }

    if (this._items.some(item => item.quantity <= 0)) {
      throw new Error("Quantity must be greater than 0")
    }

    return true
  }

  insertOrderItems(...items: OrderItem[]) {
    items.forEach(item => {
      this.items.push(item)
    })
  }

  getTotal(): number {
    return this._items.reduce((acc, item) => acc + item.orderItemTotal(), 0)
  }
}