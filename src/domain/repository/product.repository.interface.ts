import Product from "../entity/Product";
import RepositoryInterface from "./repository.interface";

export default interface ProductRepositoryInteface
  extends RepositoryInterface<Product> {

}