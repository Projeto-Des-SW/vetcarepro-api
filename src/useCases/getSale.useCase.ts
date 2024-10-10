import { Sale } from '@prisma/client'

import { SalesRepository } from '@/repositories/interfaces/sales.repository'
import { ClinicsRepository } from '@/repositories/interfaces/clinics.repository'
import { EmployeesRepository } from '@/repositories/interfaces/employees.repository'
import { ResourceNotFoundError } from '@/errors/resourceNotFound.error'

interface IRequest {
  user_id: string
  clinic_id: string
  sale_id: string
}

interface IResponse {
  sale: Sale
}

export class GetSaleUseCase {
  constructor(private salesRepository: SalesRepository, private clinicsRepository: ClinicsRepository, private employeesRepository: EmployeesRepository) {}

  async execute({ user_id, clinic_id, sale_id }: IRequest): Promise<IResponse> {
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

    const sale = await this.salesRepository.findBySaleIdAndClinicId(sale_id, clinic_id)

    if (!sale) {
      throw new ResourceNotFoundError()
    }

    return { sale }
  }
}
