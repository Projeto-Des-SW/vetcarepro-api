import { PrismaPaymentsRepository } from '@/repositories/prisma/prisma-payments.repository'
import { PrismaEmployeesRepository } from '@/repositories/prisma/prisma-employees.repository'
import { PrismaClinicsRepository } from '@/repositories/prisma/prisma-clinics.repository'
import { RegisterPaymentUseCase } from '@/useCases/registerPayment.useCase'

export function registerPaymentUseCaseFactory() {
  const paymentsRepository = new PrismaPaymentsRepository()
  const employeesRepository = new PrismaEmployeesRepository()
  const clinicsRepository = new PrismaClinicsRepository()
  const registerPaymentUseCase = new RegisterPaymentUseCase(paymentsRepository, employeesRepository, clinicsRepository)

  return registerPaymentUseCase
}
