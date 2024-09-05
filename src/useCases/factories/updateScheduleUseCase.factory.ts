import { PrismaSchedulesRepository } from '@/repositories/prisma/prisma-schedules.repository'
import { PrismaClinicsRepository } from '@/repositories/prisma/prisma-clinics.repository'
import { PrismaEmployeesRepository } from '@/repositories/prisma/prisma-employees.repository'
import { UpdateScheduleUseCase } from '@/useCases/updateSchedule.useCase'

export function updateScheduleUseCaseFactory() {
  const schedulesRepository = new PrismaSchedulesRepository()
  const clinicsRepository = new PrismaClinicsRepository()
  const employeesRepository = new PrismaEmployeesRepository()
  const updateScheduleUseCase = new UpdateScheduleUseCase(schedulesRepository, clinicsRepository, employeesRepository)

  return updateScheduleUseCase
}
