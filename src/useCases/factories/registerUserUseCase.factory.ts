import { BcryptProvider } from '@/providers/hash/bcrypt.provider'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users.repository'
import { RegisterUserUseCase } from '@/useCases/registerUser.useCase'

export function registerUserUseCaseFactory() {
  const hashProvider = new BcryptProvider()
  const usersRepository = new PrismaUsersRepository()
  const registerUserUseCase = new RegisterUserUseCase(usersRepository, hashProvider)

  return registerUserUseCase
}
