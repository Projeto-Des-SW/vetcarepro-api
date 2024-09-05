import { PrismaSchedulesRepository } from '@/repositories/prisma/prisma-schedules.repository'
import { PrismaClinicsRepository } from '@/repositories/prisma/prisma-clinics.repository'
import { PrismaEmployeesRepository } from '@/repositories/prisma/prisma-employees.repository'
import { DeleteScheduleUseCase } from '@/useCases/deleteSchedule.useCase'

export function deleteScheduleUseCaseFactory() {
  const schedulesRepository = new PrismaSchedulesRepository()
  const clinicsRepository = new PrismaClinicsRepository()
  const employeesRepository = new PrismaEmployeesRepository()
  const deleteScheduleUseCase = new DeleteScheduleUseCase(schedulesRepository, clinicsRepository, employeesRepository)

  return deleteScheduleUseCase
}
