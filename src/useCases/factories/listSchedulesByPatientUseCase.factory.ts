import { PrismaSchedulesRepository } from '@/repositories/prisma/prisma-schedules.repository'
import { PrismaClinicsRepository } from '@/repositories/prisma/prisma-clinics.repository'
import { PrismaEmployeesRepository } from '@/repositories/prisma/prisma-employees.repository'
import { PrismaPatientsRepository } from '@/repositories/prisma/prisma-patients.repository'
import { ListSchedulesByPatientUseCase } from '@/useCases/listSchedulesByPatient.useCase'

export function listSchedulesByPatientUseCaseFactory() {
  const schedulesRepository = new PrismaSchedulesRepository()
  const clinicsRepository = new PrismaClinicsRepository()
  const employeesRepository = new PrismaEmployeesRepository()
  const prismaPatientsRepository = new PrismaPatientsRepository()
  const listSchedulesByPatientUseCase = new ListSchedulesByPatientUseCase(schedulesRepository, clinicsRepository, employeesRepository, prismaPatientsRepository)

  return listSchedulesByPatientUseCase
}
