import Address from "../value-object/Address";

export default interface CustomerInterface {
  get id(): string;
  get name(): string;
  get Address(): Address;
  get rewardPoints(): number;
  isActive(): boolean
  changeName(name: string): void;
  changeAddress(address: Address): void
  addRewardPoints(points: number): void
}