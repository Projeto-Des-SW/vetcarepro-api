import { Employee } from '@prisma/client'

import { verifyEmail } from '@/util/verifyEmail'
import { HashProvider } from '@/providers/hash/hash.provider'
import { EmployeesRepository } from '@/repositories/interfaces/employees.repository'
import { ClinicsRepository } from '@/repositories/interfaces/clinics.repository'
import { UserAlreadyExistsError } from '@/errors/userAlreadyExists.error'
import { ResourceNotFoundError } from '@/errors/resourceNotFound.error' 

interface IRequest {
  user_id: string
  clinic_id: string
  name: string
  email: string
  password: string
  salary: string
  position: string
}

interface IResponse {
  employee: Employee
}

export class RegisterEmployeeUseCase {
  constructor(private employeesRepository: EmployeesRepository, private clinicsRepository: ClinicsRepository, private hashProvider: HashProvider) {}

  async execute({ user_id, clinic_id, name, email, password, salary, position }: IRequest): Promise<IResponse> {
    const clinic = await this.clinicsRepository.findByClinicIdAndUserId(clinic_id, user_id)

    if (!clinic) {
      throw new ResourceNotFoundError()
    }

    const with_same_email = await verifyEmail(email)

    if (with_same_email) {
      throw new UserAlreadyExistsError()
    }

    const password_hash = await this.hashProvider.generateHash(password)

    const employee = await this.employeesRepository.create({
      clinic_id,
      name,
      email,
      password_hash,
      salary, 
      position  
    })

    return { employee }
  }
}
