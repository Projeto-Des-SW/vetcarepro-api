import { User, Employee } from '@prisma/client'

import { HashProvider } from '@/providers/hash/hash.provider'
import { UsersRepository } from '@/repositories/interfaces/users.repository'
import { EmployeesRepository } from '@/repositories/interfaces/employees.repository'
import { InvalidCredentialsError } from '@/errors/invalidCredentials.error'

interface IRequest {
  email: string
  password: string
}

interface IResponse {
  user: User | Employee
}

export class AuthenticateUseCase {
  constructor(private usersRepository: UsersRepository, private employeesRepository: EmployeesRepository, private hashProvider: HashProvider) {}

  async execute({ email, password }: IRequest): Promise<IResponse | undefined> {
    const userAdmin = await this.usersRepository.findByEmail(email)
    const employee = await this.employeesRepository.findByEmail(email)

    if (!userAdmin && !employee) {
      throw new InvalidCredentialsError()
    }

    if (userAdmin) {
      const does_password_matches = await this.hashProvider.compareHash(password, userAdmin.password_hash)

      if (!does_password_matches) {
        throw new InvalidCredentialsError()
      }
      
      return { user: userAdmin }
    }

    if (employee) {
      const does_password_matches = await this.hashProvider.compareHash(password, employee.password_hash)

      if (!does_password_matches) {
        throw new InvalidCredentialsError()
      }
      
      return { user: employee }
    }
  }
}
