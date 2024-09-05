import { PrismaSchedulesRepository } from '@/repositories/prisma/prisma-schedules.repository'
import { PrismaClinicsRepository } from '@/repositories/prisma/prisma-clinics.repository'
import { PrismaEmployeesRepository } from '@/repositories/prisma/prisma-employees.repository'
import { ListSchedulesUseCase } from '@/useCases/listSchedules.useCase'

export function listSchedulesUseCaseFactory() {
  const schedulesRepository = new PrismaSchedulesRepository()
  const clinicsRepository = new PrismaClinicsRepository()
  const employeesRepository = new PrismaEmployeesRepository()
  const listSchedulesUseCase = new ListSchedulesUseCase(schedulesRepository, clinicsRepository, employeesRepository)

  return listSchedulesUseCase
}
