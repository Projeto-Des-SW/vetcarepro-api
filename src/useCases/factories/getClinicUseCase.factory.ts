import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users.repository'
import { PrismaClinicsRepository } from '@/repositories/prisma/prisma-clinics.repository'
import { GetClinicUseCase } from '@/useCases/getClinic.useCase'

export function getClinicUseCaseFactory() {
  const usersRepository = new PrismaUsersRepository()
  const clinicsRepository = new PrismaClinicsRepository()
  const getClinicUseCase = new GetClinicUseCase(clinicsRepository, usersRepository)

  return getClinicUseCase
}
