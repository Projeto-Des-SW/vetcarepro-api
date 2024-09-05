import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users.repository'
import { PrismaEmployeesRepository } from '@/repositories/prisma/prisma-employees.repository'
import { GetProfileUseCase } from '@/useCases/getProfile.useCase'

export function getProfileUseCaseFactory() {
  const usersRepository = new PrismaUsersRepository()
  const employeesRepository = new PrismaEmployeesRepository()
  const getProfileUseCase = new GetProfileUseCase(usersRepository, employeesRepository)

  return getProfileUseCase
}
