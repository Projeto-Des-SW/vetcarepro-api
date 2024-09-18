import { ProductsRepository } from '@/repositories/interfaces/products.repository'
import { ClinicsRepository } from '@/repositories/interfaces/clinics.repository'
import { ResourceNotFoundError } from '@/errors/resourceNotFound.error'

interface IRequest {
  user_id: string
  clinic_id: string
  product_id: string
}
export class DeleteProductUseCase {
  constructor(private productsRepository: ProductsRepository, private clinicsRepository: ClinicsRepository) {}

  async execute({ user_id, clinic_id, product_id }: IRequest): Promise<void> {
    const clinic = await this.clinicsRepository.findByClinicIdAndUserId(clinic_id, user_id)

    if (!clinic) {
      throw new ResourceNotFoundError()
    }

    const product = await this.productsRepository.findByProductIdAndClinicId(product_id, clinic_id)

    if (!product) {
      throw new ResourceNotFoundError()
    }

    product.status = false
    await this.productsRepository.save(product)
  }
}
