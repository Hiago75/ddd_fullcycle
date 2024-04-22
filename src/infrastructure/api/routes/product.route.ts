import express, { Request, Response } from "express"
import CreateProductUseCase from "../../../usecase/product/create/create.product.usecase"
import ProductRepository from "../../product/repository/sequelize/product.repository"
import { ProductType } from "../../../usecase/product/create/create.product.dto"

export const productRoute = express.Router()

productRoute.post("/", async (req: Request, res: Response) => {
  const usecase = new CreateProductUseCase(new ProductRepository())

  try {
    const productDto = {
      name: req.body.name,
      price: req.body.price,
      type: ProductType.A,
    }

    const output = await usecase.execute(productDto)
    res.status(201).send(output)
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
})