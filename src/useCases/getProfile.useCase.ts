import { UsersRepository } from '@/repositories/interfaces/users.repository'
import { EmployeesRepository } from '@/repositories/interfaces/employees.repository'
import { ClinicsRepository } from '@/repositories/interfaces/clinics.repository'
import { ResourceNotFoundError } from '@/errors/resourceNotFound.error'

interface IRequest {
  user_id: string
  clinic_id: string
}

interface IResponse {
  id: string
  name: string
  email: string
  clinic: {
    id: string
    tier: string
    status: boolean
  }
}

export class GetProfileUseCase {
  constructor(private usersRepository: UsersRepository, private employeesRepository: EmployeesRepository, private clinicsRepository: ClinicsRepository) {}

  async execute({ user_id, clinic_id }: IRequest): Promise<IResponse | undefined> {
    const user = await this.usersRepository.findById(user_id)
    const employee = await this.employeesRepository.findById(user_id)

    if (!user && !employee) {
      throw new ResourceNotFoundError()
    }

    if (user) {
      const clinic = await this.clinicsRepository.findByClinicIdAndUserId(clinic_id, user_id)

      return { 
        id: user.id,
        name: user.name,
        email: user.email,
        clinic: {
          id: clinic!.id,
          tier: clinic!.tier,
          status: clinic!.status
        }
      }
    }

    if (employee) {
      const clinic = await this.clinicsRepository.findById(employee.clinic_id)

      return { 
        id: employee.id,
        name: employee.name,
        email: employee.email,
        clinic: {
          id: clinic!.id,
          tier: clinic!.tier,
          status: clinic!.status
        }
      }
    }
  }
}
