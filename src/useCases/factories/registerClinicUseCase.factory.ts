import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users.repository'
import { PrismaClinicsRepository } from '@/repositories/prisma/prisma-clinics.repository'
import { RegisterClinicUseCase } from '@/useCases/registerClinic.useCase'

export function registerClinicUseCaseFactory() {
  const usersRepository = new PrismaUsersRepository()
  const clinicsRepository = new PrismaClinicsRepository()
  const registerClinicUseCase = new RegisterClinicUseCase(clinicsRepository, usersRepository)

  return registerClinicUseCase
}
