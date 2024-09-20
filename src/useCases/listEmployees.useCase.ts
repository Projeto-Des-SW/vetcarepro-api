import { Employee } from '@prisma/client'

import { EmployeesRepository } from '@/repositories/interfaces/employees.repository'
import { ClinicsRepository } from '@/repositories/interfaces/clinics.repository'
import { ResourceNotFoundError } from '@/errors/resourceNotFound.error'
import { WithoutPasswordEmployee } from '@/util/omitField'

interface IRequest {
  user_id: string
  clinic_id: string
}

interface IResponse {
  employees: WithoutPasswordEmployee[]
}

export class ListEmployeesUseCase {
  constructor(private employeesRepository: EmployeesRepository, private clinicsRepository: ClinicsRepository) {}

  async execute({ user_id, clinic_id }: IRequest): Promise<IResponse> {
    const clinic = await this.clinicsRepository.findByClinicIdAndUserId(clinic_id, user_id)

    if (!clinic) {
      throw new ResourceNotFoundError()
    }

    const employees = await this.employeesRepository.listByClinicId(clinic_id)

    return { employees }
  }
}
