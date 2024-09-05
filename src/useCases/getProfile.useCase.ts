import { UsersRepository } from '@/repositories/interfaces/users.repository'
import { EmployeesRepository } from '@/repositories/interfaces/employees.repository'
import { ResourceNotFoundError } from '@/errors/resourceNotFound.error'

interface IRequest {
  id: string
}

interface IResponse {
  id: string
  name: string
  email: string
}

export class GetProfileUseCase {
  constructor(private usersRepository: UsersRepository, private employeesRepository: EmployeesRepository) {}

  async execute({ id }: IRequest): Promise<IResponse | undefined> {
    const user = await this.usersRepository.findById(id)
    const employee = await this.employeesRepository.findById(id)

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
        email: employee.email
      }
    }
  }
}
