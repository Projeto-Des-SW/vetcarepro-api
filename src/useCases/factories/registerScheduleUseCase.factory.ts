import { PrismaClinicsRepository } from '@/repositories/prisma/prisma-clinics.repository'
import { PrismaPatientsRepository } from '@/repositories/prisma/prisma-patients.repository'
import { PrismaServicesRepository } from '@/repositories/prisma/prisma-services.repository'
import { PrismaSchedulesRepository } from '@/repositories/prisma/prisma-schedules.repository'
import { RegisterScheduleUseCase } from '@/useCases/registerSchedule.useCase'

export function registerScheduleUseCaseFactory() {
  const clinicsRepository = new PrismaClinicsRepository()
  const patientsRepository = new PrismaPatientsRepository()
  const servicesRepository = new PrismaServicesRepository()
  const schedulesRepository = new PrismaSchedulesRepository()
  const registerScheduleUseCase = new RegisterScheduleUseCase(schedulesRepository, patientsRepository, clinicsRepository, servicesRepository)

  return registerScheduleUseCase
}
