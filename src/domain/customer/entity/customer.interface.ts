import Address from "../value-object/Address";

export default interface CustomerInterface {
  get id(): string;
  get name(): string;
  get Address(): Address;
  isActive(): boolean
  changeName(name: string): void;
  changeAddress(address: Address): void
}