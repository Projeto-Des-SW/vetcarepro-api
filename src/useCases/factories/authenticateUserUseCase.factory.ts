import { BcryptProvider } from '@/providers/hash/bcrypt.provider'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users.repository'
import { AuthenticateUserUseCase } from '@/useCases/authenticateUser.useCase'

export function authenticateUserUseCaseFactory() {
  const hashProvider = new BcryptProvider()
  const usersRepository = new PrismaUsersRepository()
  const authenticateUserUseCase = new AuthenticateUserUseCase(usersRepository, hashProvider)

  return authenticateUserUseCase
}
