import ValidatorInterface from "../../@shared/validator/validator.interface";
import Product from "../entity/Product";
import ProductYupValidator from "../validator/product.validator.yup.validator";

export default class ProductValidatorFactory {
  static create(): ValidatorInterface<Product> {
    return new ProductYupValidator()
  }
}