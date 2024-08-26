import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users.repository'
import { PrismaClinicsRepository } from '@/repositories/prisma/prisma-clinics.repository'
import { UpdateClinicUseCase } from '@/useCases/updateClinic.useCase'

export function updateClinicUseCaseFactory() {
  const usersRepository = new PrismaUsersRepository()
  const clinicsRepository = new PrismaClinicsRepository()
  const updateClinicUseCase = new UpdateClinicUseCase(clinicsRepository, usersRepository)

  return updateClinicUseCase
}
