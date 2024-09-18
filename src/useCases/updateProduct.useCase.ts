import { Prisma, Product } from '@prisma/client'

import { ProductsRepository } from '@/repositories/interfaces/products.repository'
import { ClinicsRepository } from '@/repositories/interfaces/clinics.repository'
import { ResourceNotFoundError } from '@/errors/resourceNotFound.error'

interface IRequest {
  user_id: string
  clinic_id: string
  product_id: string
  title: string
  amount: string
  quantity: number 
}

interface IResponse {
  product: Product
}

export class UpdateProductUseCase {
  constructor(private productsRepository: ProductsRepository, private clinicsRepository: ClinicsRepository) {}

  async execute({ user_id, clinic_id, product_id, title, amount, quantity }: IRequest): Promise<IResponse> {
    const clinic = await this.clinicsRepository.findByClinicIdAndUserId(clinic_id, user_id)

    if (!clinic) {
      throw new ResourceNotFoundError()
    }

    const product = await this.productsRepository.findByProductIdAndClinicId(product_id, clinic_id)

    if (!product) {
      throw new ResourceNotFoundError()
    }

    product.title = title
    product.quantity = quantity
    product.amount = new Prisma.Decimal(amount)
    await this.productsRepository.save(product)

    return { product }
  }
}
