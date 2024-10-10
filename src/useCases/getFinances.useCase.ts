import { ClinicsRepository } from '@/repositories/interfaces/clinics.repository'
import { EmployeesRepository } from '@/repositories/interfaces/employees.repository'
import { SchedulesRepository } from '@/repositories/interfaces/schedules.repository'
import { ServicesRepository } from '@/repositories/interfaces/services.repository'
import { SalesRepository } from '@/repositories/interfaces/sales.repository'
import { ResourceNotFoundError } from '@/errors/resourceNotFound.error'

interface IRequest {
  user_id: string
  clinic_id: string
}

interface IResponse {
  totalValueSchedulesPending: number
  totalValueSchedulesFinished: number
  totalValueSales: number
}

export class GetFinancesUseCase {
  constructor(
    private clinicsRepository: ClinicsRepository,
    private employeesRepository: EmployeesRepository, 
    private schedulesRepository: SchedulesRepository, 
    private servicesRepository: ServicesRepository, 
    private salesRepository: SalesRepository
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

    let totalValueSchedulesPending = 0
    let totalValueSchedulesFinished = 0
    let totalValueSales = 0

    await Promise.all(schedulesIsNotFinished.map(async (schedule) => {
      const service = await this.servicesRepository.findById(schedule.service_id)
      totalValueSchedulesFinished += Number(service!.amount)
    }))

    await Promise.all(schedulesFinished.map(async (schedule) => {
      const service = await this.servicesRepository.findById(schedule.service_id)
      totalValueSchedulesFinished += Number(service!.amount)
    }))

    await Promise.all(sales.map(async (sale) => {
      totalValueSales += Number(sale.amount)
    }))

    return { 
      totalValueSchedulesPending,
      totalValueSchedulesFinished,
      totalValueSales
    }
  }
}
