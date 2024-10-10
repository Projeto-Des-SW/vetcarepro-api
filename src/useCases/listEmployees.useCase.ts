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

    const employees = await this.employeesRepository.listByClinicId(clinic_id)

    return { employees }
  }
}
