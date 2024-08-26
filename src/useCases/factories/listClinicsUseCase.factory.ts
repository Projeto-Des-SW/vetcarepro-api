import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users.repository'
import { PrismaClinicsRepository } from '@/repositories/prisma/prisma-clinics.repository'
import { ListClinicsUseCase } from '@/useCases/listClinics.useCase'

export function listClinicsUseCaseFactory() {
  const usersRepository = new PrismaUsersRepository()
  const clinicsRepository = new PrismaClinicsRepository()
  const listClinicsUseCase = new ListClinicsUseCase(clinicsRepository, usersRepository)

  return listClinicsUseCase
}
