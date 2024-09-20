import { Product } from '@prisma/client'

import { ProductsRepository } from '@/repositories/interfaces/products.repository'
import { ClinicsRepository } from '@/repositories/interfaces/clinics.repository'
import { ProductAlreadyExistsError } from '@/errors/productAlreadyExists.error' 
import { ResourceNotFoundError } from '@/errors/resourceNotFound.error' 

interface IRequest {
  user_id: string
  clinic_id: string
  title: string
  amount: string
  quantity: number 
}

interface IResponse {
  product: Product
}

export class RegisterProductUseCase {
  constructor(private productsRepository: ProductsRepository, private clinicsRepository: ClinicsRepository) {}

  async execute({ user_id, clinic_id, title, amount, quantity }: IRequest): Promise<IResponse> {
    const clinic = await this.clinicsRepository.findByClinicIdAndUserId(clinic_id, user_id)

    if (!clinic) {
      throw new ResourceNotFoundError()
    }

    const product_with_same_title = await this.productsRepository.findByTitleAndClinicId(title, clinic_id)

    if (product_with_same_title) {
      throw new ProductAlreadyExistsError()
    }

    const product = await this.productsRepository.create({ 
      clinic_id,
      title,
      quantity,
      amount
    })

    return { product }
  }
}
