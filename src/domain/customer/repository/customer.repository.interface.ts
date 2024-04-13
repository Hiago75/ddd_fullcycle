import Customer from "../entity/Customer";
import RepositoryInterface from "../../@shared/repository/repository.interface";
import CustomerInterface from "../entity/customer.interface";

export default interface CustomerRepositoryInteface
  extends RepositoryInterface<CustomerInterface> {

}