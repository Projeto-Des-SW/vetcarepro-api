import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users.repository'
import { PrismaEmployeesRepository } from '@/repositories/prisma/prisma-employees.repository'
import { PrismaClinicsRepository } from '@/repositories/prisma/prisma-clinics.repository'
import { GetProfileUseCase } from '@/useCases/getProfile.useCase'

export function getProfileUseCaseFactory() {
  const usersRepository = new PrismaUsersRepository()
  const employeesRepository = new PrismaEmployeesRepository()
  const clinicsRepository = new PrismaClinicsRepository()
  const getProfileUseCase = new GetProfileUseCase(usersRepository, employeesRepository, clinicsRepository)

  return getProfileUseCase
}
