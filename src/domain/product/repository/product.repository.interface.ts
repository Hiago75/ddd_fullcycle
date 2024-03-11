import Product from "../entity/Product";
import RepositoryInterface from "../../@shared/repository/repository.interface";

export default interface ProductRepositoryInteface
  extends RepositoryInterface<Product> {

}