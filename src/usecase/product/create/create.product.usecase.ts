import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductRepositoryInteface from "../../../domain/product/repository/product.repository.interface";
import { InputCreateProductDto, OutputCreateProductDto } from "./create.product.dto";

export default class CreateProductUseCase {
  private productRepository: ProductRepositoryInteface

  constructor(productRepository: ProductRepositoryInteface) {
    this.productRepository = productRepository
  }

  async execute(input: InputCreateProductDto): Promise<OutputCreateProductDto> {
    const product = ProductFactory.create(input.type, input.name, input.price)

    await this.productRepository.create(product)

    return {
      id: product.id,
      name: product.name,
      price: product.price
    }
  }
}