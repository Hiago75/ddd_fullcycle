import express, { Request, Response } from "express"
import CreateProductUseCase from "../../../usecase/product/create/create.product.usecase"
import ProductRepository from "../../product/repository/sequelize/product.repository"
import { ProductType } from "../../../usecase/product/create/create.product.dto"
import ListProductUseCase from "../../../usecase/product/list/list.product.usecase"
import FindProductUseCase from "../../../usecase/product/find/find.product.usecase"
import { InputFindProductDto } from "../../../usecase/product/find/find.product.dto"
import UpdateProductUseCase from "../../../usecase/product/update/update.product.usecase"

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
    res.status(500).send(err)
  }
})

productRoute.get("/", async (_: Request, res: Response) => {
  const usecase = new ListProductUseCase(new ProductRepository())

  try {
    const output = await usecase.execute({})
    res.send(output)
  } catch (err) {
    res.status(500).send(err)
  }
})

productRoute.get("/:id", async (req: Request<InputFindProductDto>, res: Response) => {
  const usecase = new FindProductUseCase(new ProductRepository())

  try {
    const output = await usecase.execute(req.params)
    res.send(output)
  } catch (err) {
    res.status(500).send(err)
  }
})

productRoute.put("/", async (req: Request, res: Response) => {
  const usecase = new UpdateProductUseCase(new ProductRepository())

  try {
    const productDto = {
      id: req.body.id,
      name: req.body.name,
      price: req.body.price,
    }

    const output = await usecase.execute(productDto)
    res.status(200).send(output)
  } catch (err) {
    res.status(500).send(err)
  }
})