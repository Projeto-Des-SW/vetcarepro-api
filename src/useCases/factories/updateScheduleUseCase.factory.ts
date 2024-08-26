import { PrismaSchedulesRepository } from '@/repositories/prisma/prisma-schedules.repository'
import { PrismaClinicsRepository } from '@/repositories/prisma/prisma-clinics.repository'
import { UpdateScheduleUseCase } from '@/useCases/updateSchedule.useCase'

export function updateScheduleUseCaseFactory() {
  const schedulesRepository = new PrismaSchedulesRepository()
  const clinicsRepository = new PrismaClinicsRepository()
  const updateScheduleUseCase = new UpdateScheduleUseCase(schedulesRepository, clinicsRepository)

  return updateScheduleUseCase
}
