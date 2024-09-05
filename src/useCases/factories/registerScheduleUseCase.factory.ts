import { PrismaClinicsRepository } from '@/repositories/prisma/prisma-clinics.repository'
import { PrismaPatientsRepository } from '@/repositories/prisma/prisma-patients.repository'
import { PrismaServicesRepository } from '@/repositories/prisma/prisma-services.repository'
import { PrismaSchedulesRepository } from '@/repositories/prisma/prisma-schedules.repository'
import { PrismaEmployeesRepository } from '@/repositories/prisma/prisma-employees.repository'
import { RegisterScheduleUseCase } from '@/useCases/registerSchedule.useCase'

export function registerScheduleUseCaseFactory() {
  const clinicsRepository = new PrismaClinicsRepository()
  const patientsRepository = new PrismaPatientsRepository()
  const servicesRepository = new PrismaServicesRepository()
  const schedulesRepository = new PrismaSchedulesRepository()
  const employeesRepository = new PrismaEmployeesRepository()
  const registerScheduleUseCase = new RegisterScheduleUseCase(schedulesRepository, clinicsRepository, patientsRepository, servicesRepository, employeesRepository)

  return registerScheduleUseCase
}
