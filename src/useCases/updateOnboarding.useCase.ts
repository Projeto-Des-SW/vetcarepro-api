import { User, Employee } from '@prisma/client'

import { UsersRepository } from '@/repositories/interfaces/users.repository'
import { EmployeesRepository } from '@/repositories/interfaces/employees.repository'
import { ResourceNotFoundError } from '@/errors/resourceNotFound.error'

interface IRequest {
  id: string
  onboarding: boolean
}

interface IResponse {
  user?: User
  employee?: Employee
}

export class UpdateOnboardingUseCase {
  constructor(private usersRepository: UsersRepository, private employeesRepository: EmployeesRepository) {}

  async execute({ id, onboarding }: IRequest): Promise<IResponse | undefined> {
    const user = await this.usersRepository.findById(id)
    const employee = await this.employeesRepository.findById(id)

    if (!user && !employee) {
      throw new ResourceNotFoundError()
    }
  
    if (user) {
      user.onboarding = onboarding
      await this.usersRepository.save(user)
  
      return { user }
    }

    if (employee) {
      employee.onboarding = onboarding
      await this.employeesRepository.save(employee)
  
      return { employee }
    }
  }
}
