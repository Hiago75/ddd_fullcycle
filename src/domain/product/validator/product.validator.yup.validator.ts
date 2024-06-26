import ValidatorInterface from "../../@shared/validator/validator.interface";
import Product from "../entity/Product";
import * as yup from "yup"

export default class ProductYupValidator implements ValidatorInterface<Product> {
  validate(entity: Product): void {
    try {
      entity.notification.clearErrors()

      yup.object().shape({
        id: yup.string().required("Id is required"),
        name: yup.string().required("Name is required"),
        price: yup.number().moreThan(0).positive().required()
      })
        .validateSync(
          {
            id: entity.id,
            name: entity.name,
            price: entity.price,
          },
          {
            abortEarly: false,
          }
        )
    } catch (errors) {
      const e = errors as yup.ValidationError;

      e.errors.forEach(error => {
        entity.notification.addError({
          context: "product",
          message: error
        })
      })
    }
  }
}