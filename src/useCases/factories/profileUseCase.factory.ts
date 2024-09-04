import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users.repository'
import { PrismaEmployeesRepository } from '@/repositories/prisma/prisma-employees.repository'
import { ProfileUseCase } from '@/useCases/profile.useCase'

export function profileUseCaseFactory() {
  const usersRepository = new PrismaUsersRepository()
  const employeesRepository = new PrismaEmployeesRepository()
  const profileUseCase = new ProfileUseCase(usersRepository, employeesRepository)

  return profileUseCase
}
