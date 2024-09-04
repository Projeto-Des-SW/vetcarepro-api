import { BcryptProvider } from '@/providers/hash/bcrypt.provider'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users.repository'
import { PrismaEmployeesRepository } from '@/repositories/prisma/prisma-employees.repository'
import { AuthenticateUseCase } from '@/useCases/authenticate.useCase'

export function authenticateUseCaseFactory() {
  const hashProvider = new BcryptProvider()
  const usersRepository = new PrismaUsersRepository()
  const employeesRepository = new PrismaEmployeesRepository()
  const authenticateUseCase = new AuthenticateUseCase(usersRepository, employeesRepository, hashProvider)

  return authenticateUseCase
}
