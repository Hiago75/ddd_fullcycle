import Entity from "../../@shared/entity/entity.abstract";
import NotificationError from "../../@shared/notification/notification.error";
import Address from "../value-object/Address";
import CustomerInterface from "./customer.interface";

export default class Customer extends Entity implements CustomerInterface {
  private _id: string;
  private _name: string;
  private _address!: Address;
  private _active: boolean = false;
  private _rewardPoints: number = 0;

  constructor(id: string, name: string) {
    super()
    this._id = id;
    this._name = name;

    this.validate();
  }

  get id(): string {
    return this._id;
  }

  static create(id: string, name: string): Customer {
    const customer = new Customer(id, name);

    return customer
  }

  get name(): string {
    return this._name;
  }

  get rewardPoints(): number {
    return this._rewardPoints
  }

  get Address(): Address {
    return this._address
  }

  set Address(address: Address) {
    this._address = address;
  }

  changeAddress(address: Address) {
    this._address = address;
  }

  validate() {
    this.notification.clearErrors();

    if (this.id.length === 0) {
      this.notification.addError({
        context: "customer",
        message: "Id is required"
      })
    }

    if (this._name.length === 0) {
      this.notification.addError({
        context: "customer",
        message: "Name is required"
      })
    }

    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors())
    }

    return true;
  }

  changeName(name: string) {
    this._name = name;
    this.validate();
  }

  isActive(): boolean {
    return this._active
  }

  activate() {
    if (this._address === undefined) {
      throw new Error("Address is mandatory to activate a customer");
    }

    this._active = true;
  }

  deactivate() {
    this._active = false;
  }

  addRewardPoints(points: number) {
    this._rewardPoints += points;
  }
}