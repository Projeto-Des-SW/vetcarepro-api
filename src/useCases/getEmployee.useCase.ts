import { Employee } from '@prisma/client'

import { EmployeesRepository } from '@/repositories/interfaces/employees.repository'
import { ClinicsRepository } from '@/repositories/interfaces/clinics.repository'
import { ResourceNotFoundError } from '@/errors/resourceNotFound.error'

interface IRequest {
  user_id: string
  clinic_id: string
  employee_id: string
}

interface IResponse {
  employee: Employee
}

export class GetEmployeeUseCase {
  constructor(private employeesRepository: EmployeesRepository, private clinicsRepository: ClinicsRepository) {}

  async execute({ user_id, clinic_id, employee_id }: IRequest): Promise<IResponse> {
    const clinic = await this.clinicsRepository.findByClinicIdAndUserId(clinic_id, user_id)

    if (!clinic) {
      throw new ResourceNotFoundError()
    }

    const employee = await this.employeesRepository.findByEmployeeIdAndClinicId(employee_id, clinic_id)

    if (!employee) {
      throw new ResourceNotFoundError()
    }

    return { employee }
  }
}
