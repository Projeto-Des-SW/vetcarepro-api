import { Clinic } from '@prisma/client'

import { ClinicsRepository } from '@/repositories/interfaces/clinics.repository'
import { EmployeesRepository } from '@/repositories/interfaces/employees.repository'
import { ResourceNotFoundError } from '@/errors/resourceNotFound.error'

interface IRequest {
  user_id: string
}

interface IResponse {
  clinics: Clinic[]
}

export class ListClinicsUseCase {
  constructor(private clinicsRepository: ClinicsRepository, private employeesRepository: EmployeesRepository) {}

  async execute({ user_id }: IRequest): Promise<IResponse> {
    let clinics = []

    clinics = await this.clinicsRepository.listByUserId(user_id)

    if (!clinics.length) {
      const employee = await this.employeesRepository.findById(user_id)

      const clinic = await this.clinicsRepository.findById(employee!.clinic_id)

      if (clinic) {
        clinics.push(clinic)
      }
    }

    if (!clinics.length) {
      throw new ResourceNotFoundError()
    }

    return { clinics }
  }
}
