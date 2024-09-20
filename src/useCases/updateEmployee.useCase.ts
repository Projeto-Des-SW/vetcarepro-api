import { Employee, Prisma } from '@prisma/client'

import { verifyEmailAndReturnUserId } from '@/util/verifyEmail'
import { EmployeesRepository } from '@/repositories/interfaces/employees.repository'
import { ClinicsRepository } from '@/repositories/interfaces/clinics.repository'
import { UserAlreadyExistsError } from '@/errors/userAlreadyExists.error'
import { ResourceNotFoundError } from '@/errors/resourceNotFound.error'

interface IRequest {
  user_id: string
  clinic_id: string
  employee_id: string
  name: string
  email: string
  salary: string
  position: string
  last_payment_date: Date
}

interface IResponse {
  employee: Employee
}

export class UpdateEmployeeUseCase {
  constructor(private employeesRepository: EmployeesRepository, private clinicsRepository: ClinicsRepository) {}

  async execute({ user_id, clinic_id, employee_id, name, email, salary, position, last_payment_date }: IRequest): Promise<IResponse> {
    const clinic = await this.clinicsRepository.findByClinicIdAndUserId(clinic_id, user_id)

    if (!clinic) {
      throw new ResourceNotFoundError()
    }

    const employee = await this.employeesRepository.findByEmployeeIdAndClinicId(employee_id, clinic_id)

    if (!employee) {
      throw new ResourceNotFoundError()
    }

    const with_same_email = await verifyEmailAndReturnUserId(email)

    if (with_same_email && with_same_email.id != employee_id) {
      throw new UserAlreadyExistsError()
    }

    employee.name = name
    employee.email = email
    employee.salary = salary
    employee.position = position
    employee.last_payment_date = last_payment_date
    await this.employeesRepository.save(employee)

    return { employee }
  }
}
