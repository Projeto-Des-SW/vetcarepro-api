import { User, Employee } from '@prisma/client'

import { UsersRepository } from '@/repositories/interfaces/users.repository'
import { EmployeesRepository } from '@/repositories/interfaces/employees.repository'
import { ResourceNotFoundError } from '@/errors/resourceNotFound.error'

interface IRequest {
  user_id: string
  onboarding: boolean
}

interface IResponse {
  user?: User
  employee?: Employee
}

export class UpdateOnboardingUseCase {
  constructor(private usersRepository: UsersRepository, private employeesRepository: EmployeesRepository) {}

  async execute({ user_id, onboarding }: IRequest): Promise<IResponse | undefined> {
    const user = await this.usersRepository.findById(user_id)
    const employee = await this.employeesRepository.findById(user_id)

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
