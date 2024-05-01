import ValidatorInterface from "../../@shared/validator/validator.interface";
import Customer from "../entity/Customer";
import CustomerYupValidator from "../validator/customer.yup.validator";

export default class CustomerValidatorFactory {
  static create(): ValidatorInterface<Customer> {
    return new CustomerYupValidator()
  }
}