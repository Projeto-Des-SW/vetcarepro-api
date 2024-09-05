import { PrismaSchedulesRepository } from '@/repositories/prisma/prisma-schedules.repository'
import { PrismaClinicsRepository } from '@/repositories/prisma/prisma-clinics.repository'
import { PrismaEmployeesRepository } from '@/repositories/prisma/prisma-employees.repository'
import { GetScheduleUseCase } from '@/useCases/getSchedule.useCase'

export function getScheduleUseCaseFactory() {
  const schedulesRepository = new PrismaSchedulesRepository()
  const clinicsRepository = new PrismaClinicsRepository()
  const employeesRepository = new PrismaEmployeesRepository()
  const getScheduleUseCase = new GetScheduleUseCase(schedulesRepository, clinicsRepository, employeesRepository)

  return getScheduleUseCase
}
