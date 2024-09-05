import { Clinic } from '@prisma/client'

import { ClinicsRepository } from '@/repositories/interfaces/clinics.repository'
import { EmployeesRepository } from '@/repositories/interfaces/employees.repository'
import { ResourceNotFoundError } from '@/errors/resourceNotFound.error'

interface IRequest {
  user_id: string
  clinic_id: string
}

interface IResponse {
  clinic: Clinic
}

export class GetClinicUseCase {
  constructor(private clinicsRepository: ClinicsRepository, private employeesRepository: EmployeesRepository) {}

  async execute({ user_id, clinic_id }: IRequest): Promise<IResponse> {
    let clinic

    clinic = await this.clinicsRepository.findByClinicIdAndUserId(clinic_id, user_id)

    if (!clinic) {
      const employee = await this.employeesRepository.findById(user_id)

      clinic = await this.clinicsRepository.findById(employee!.clinic_id)
    }

    if (!clinic) {
      throw new ResourceNotFoundError()
    }

    return { clinic }
  }
}
