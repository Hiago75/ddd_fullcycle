// Essa entidade é focada em NEGÓCIO, ou seja, não está relacionada ao ORM que está ligada a PERSISTENCIA. Durante o desenvolvimento do software, vai ser necessário ter 2 entidades, uma delas responsável pela persistencia e a outra seria essa responsável pela regra. Muitas vezes o nome entidade sequer cabe a persistência que pode usar um nome diferente para facilitar o entendimento do contexto de cada arquivo. Um exemplo de como organizar isso seria:

import EventDispatcher from "../event/@shared/event-dispatcher";
import CustomerCreatedEvent from "../event/customer/customer-created.event";
import Address from "./Address";

/* 
  Complexidade de negócio:
  Domain
  - Entity
  - - Customer (regra de negócio)
  

  
  
  Complexidade acidental: 
  infra
  - Entity/Model
  - - Customer (get, set)
*/

export default class Customer {
  private _id: string;
  private _name: string;
  private _address!: Address;
  private _active: boolean = false;
  private _rewardPoints: number = 0;

  constructor(id: string, name: string) {
    this._id = id;
    this._name = name;

    this.validate();
  }

  static create(id: string, name: string): Customer {
    const customer = new Customer(id, name);

    return customer
  }

  get id(): string {
    return this._id;
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
    if (this._id.length === 0) {
      throw new Error("Id is required")
    }

    if (this._name.length === 0) {
      throw new Error('Name is required')
    }
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