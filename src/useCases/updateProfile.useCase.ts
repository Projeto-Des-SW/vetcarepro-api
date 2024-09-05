import { User, Employee } from '@prisma/client'

import { verifyEmailAndReturnUserId } from '@/util/verifyEmail'
import { HashProvider } from '@/providers/hash/hash.provider'
import { UsersRepository } from '@/repositories/interfaces/users.repository'
import { EmployeesRepository } from '@/repositories/interfaces/employees.repository'
import { UserAlreadyExistsError } from '@/errors/userAlreadyExists.error'
import { ResourceNotFoundError } from '@/errors/resourceNotFound.error'

interface IRequest {
  id: string
  name: string
  email: string
  password: string
}

interface IResponse {
  user?: User
  employee?: Employee
}

export class UpdateProfileUseCase {
  constructor(private usersRepository: UsersRepository, private employeesRepository: EmployeesRepository, private hashProvider: HashProvider) {}

  async execute({ id, name, email, password }: IRequest): Promise<IResponse | undefined> {
    const user = await this.usersRepository.findById(id)
    const employee = await this.employeesRepository.findById(id)

    if (!user && !employee) {
      throw new ResourceNotFoundError()
    }

    const with_same_email = await verifyEmailAndReturnUserId(email)

    if (with_same_email && with_same_email.id != id) {
      throw new UserAlreadyExistsError()
    }

    const password_hash = await this.hashProvider.generateHash(password)
  
    if (user) {
      user.name = name
      user.email = email
      user.password_hash = password_hash
      await this.usersRepository.save(user)
  
      return { user }
    }

    if (employee) {
      employee.name = name
      employee.email = email
      employee.password_hash = password_hash
      await this.employeesRepository.save(employee)
  
      return { employee }
    }
  }
}
