import { BcryptProvider } from '@/providers/hash/bcrypt.provider'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users.repository'
import { PrismaEmployeesRepository } from '@/repositories/prisma/prisma-employees.repository'
import { UpdateProfileUseCase } from '@/useCases/updateProfile.useCase'

export function updateServiceUseCaseFactory() {
  const hashProvider = new BcryptProvider()
  const usersRepository = new PrismaUsersRepository()
  const employeesRepository = new PrismaEmployeesRepository()
  const updateProfileUseCase = new UpdateProfileUseCase(usersRepository, employeesRepository, hashProvider)

  return updateProfileUseCase
}
