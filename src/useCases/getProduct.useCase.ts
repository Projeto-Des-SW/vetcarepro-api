import { Product } from '@prisma/client'

import { ProductsRepository } from '@/repositories/interfaces/products.repository'
import { ClinicsRepository } from '@/repositories/interfaces/clinics.repository'
import { EmployeesRepository } from '@/repositories/interfaces/employees.repository'
import { ResourceNotFoundError } from '@/errors/resourceNotFound.error'

interface IRequest {
  user_id: string
  clinic_id: string
  product_id: string
}

interface IResponse {
  product: Product
}

export class GetProductUseCase {
  constructor(private productsRepository: ProductsRepository, private clinicsRepository: ClinicsRepository, private employeesRepository: EmployeesRepository) {}

  async execute({ user_id, clinic_id, product_id }: IRequest): Promise<IResponse> {
    let clinic

    clinic = await this.clinicsRepository.findByClinicIdAndUserId(clinic_id, user_id)

    if (!clinic) {
      const employee = await this.employeesRepository.findById(user_id)

      if (employee) {
        clinic = await this.clinicsRepository.findById(employee.clinic_id)
      }
    }

    if (!clinic) {
      throw new ResourceNotFoundError()
    }

    const product = await this.productsRepository.findByProductIdAndClinicId(product_id, clinic_id)

    if (!product) {
      throw new ResourceNotFoundError()
    }

    return { product }
  }
}
