import { UsersRepository } from '@/repositories/interfaces/users.repository'
import { EmployeesRepository } from '@/repositories/interfaces/employees.repository'
import { ResourceNotFoundError } from '@/errors/resourceNotFound.error'

interface IRequest {
  user_id: string
}

interface IResponse {
  id: string
  name: string
  email: string
  role?: string
}

export class GetProfileUseCase {
  constructor(private usersRepository: UsersRepository, private employeesRepository: EmployeesRepository) {}

  async execute({ user_id }: IRequest): Promise<IResponse | undefined> {
    const user = await this.usersRepository.findById(user_id)
    const employee = await this.employeesRepository.findById(user_id)

    if (!user && !employee) {
      throw new ResourceNotFoundError()
    }

    if (user) {
      return { 
        id: user.id,
        name: user.name,
        email: user.email
      }
    }

    if (employee) {
      return { 
        id: employee.id,
        name: employee.name,
        email: employee.email,
        role: employee.role
      }
    }
  }
}
