import Customer from "../entity/Customer";
import RepositoryInterface from "./repository.interface";

export default interface CustomerRepositoryInteface
  extends RepositoryInterface<Customer> {

}