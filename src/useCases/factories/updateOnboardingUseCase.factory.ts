import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users.repository'
import { PrismaEmployeesRepository } from '@/repositories/prisma/prisma-employees.repository'
import { UpdateOnboardingUseCase } from '@/useCases/updateOnboarding.useCase'

export function updateOnboardingUseCaseFactory() {
  const usersRepository = new PrismaUsersRepository()
  const employeesRepository = new PrismaEmployeesRepository()
  const updateOnboardingUseCase = new UpdateOnboardingUseCase(usersRepository, employeesRepository)

  return updateOnboardingUseCase
}
