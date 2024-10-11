import { ClinicsRepository } from '@/repositories/interfaces/clinics.repository'
import { EmployeesRepository } from '@/repositories/interfaces/employees.repository'
import { SchedulesRepository } from '@/repositories/interfaces/schedules.repository'
import { ServicesRepository } from '@/repositories/interfaces/services.repository'
import { SalesRepository } from '@/repositories/interfaces/sales.repository'
import { PaymentsRepository } from '@/repositories/interfaces/payments.repository'
import { ResourceNotFoundError } from '@/errors/resourceNotFound.error'

interface IRequest {
  user_id: string
  clinic_id: string
}

interface IResponse {
  totalValueSchedulesPending: number
  totalValueSchedulesFinished: number
  totalValueSales: number
  totalValuePayments: number
}

export class GetFinancesUseCase {
  constructor(
    private clinicsRepository: ClinicsRepository,
    private employeesRepository: EmployeesRepository, 
    private schedulesRepository: SchedulesRepository, 
    private servicesRepository: ServicesRepository, 
    private salesRepository: SalesRepository,
    private paymentsRepository: PaymentsRepository
  ) {}

  async execute({ user_id, clinic_id }: IRequest): Promise<IResponse> {
    let clinic

    clinic = await this.clinicsRepository.findByClinicIdAndUserId(clinic_id, user_id)

    if (!clinic) {
      const employee = await this.employeesRepository.findById(user_id)

      if (employee) {
        clinic = await this.clinicsRepository.findById(employee.clinic_id)
      }
    }

    if (!clinic) {
      throw new ResourceNotFoundError()
    }

    const schedulesIsNotFinished = await this.schedulesRepository.listByClinicIdGetIsNotFinished(clinic_id)
    const schedulesFinished = await this.schedulesRepository.listByClinicIdGetFinished(clinic_id)
    const sales = await this.salesRepository.listByClinicId(clinic_id)
    const payments = await this.paymentsRepository.listByClinicId(clinic_id)

    let totalValueSchedulesPending = 0
    let totalValueSchedulesFinished = 0
    let totalValueSales = 0
    let totalValuePayments = 0

    if (schedulesIsNotFinished.length) {
      await Promise.all(schedulesIsNotFinished.map(async (schedule) => {
        const service = await this.servicesRepository.findById(schedule.service_id)
        totalValueSchedulesPending += Number(service!.amount)
      }))
    }

    if (schedulesFinished.length) {
      await Promise.all(schedulesFinished.map(async (schedule) => {
        const service = await this.servicesRepository.findById(schedule.service_id)
        totalValueSchedulesFinished += Number(service!.amount)
      }))
    }

    if (sales.length) {
      await Promise.all(sales.map(async (sale) => {
        totalValueSales += Number(sale.amount)
      }))
    }

    if (payments.length) {
      await Promise.all(payments.map(async (payment) => {
        totalValuePayments += Number(payment.amount)
      }))
    }

    return { 
      totalValueSchedulesPending,
      totalValueSchedulesFinished,
      totalValueSales,
      totalValuePayments
    }
  }
}
