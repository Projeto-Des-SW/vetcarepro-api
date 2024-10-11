import { Payment } from '@prisma/client'

import { PaymentsRepository } from '@/repositories/interfaces/payments.repository'
import { EmployeesRepository } from '@/repositories/interfaces/employees.repository'
import { ClinicsRepository } from '@/repositories/interfaces/clinics.repository'
import { ResourceNotFoundError } from '@/errors/resourceNotFound.error'

interface IRequest {
  user_id: string
  clinic_id: string
  employee_id: string
}

interface IResponse {
  payment: Payment
}

export class RegisterPaymentUseCase {
  constructor(private paymentsRepository: PaymentsRepository, private employeesRepository: EmployeesRepository, private clinicsRepository: ClinicsRepository) {}

  async execute({ user_id, clinic_id, employee_id }: IRequest): Promise<IResponse> {
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

    const employee = await this.employeesRepository.findByEmployeeIdAndClinicId(employee_id, clinic_id)

    if (!employee) {
      throw new ResourceNotFoundError()
    }

    employee.last_payment_date = new Date
    await this.employeesRepository.save(employee)

    const payment = await this.paymentsRepository.create({
      amount: employee.salary,
      employee_id,
      clinic_id  
    })

    return { payment }
  }
}
