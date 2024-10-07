import { Schedule } from '@prisma/client'

import { SchedulesRepository } from '@/repositories/interfaces/schedules.repository'
import { ClinicsRepository } from '@/repositories/interfaces/clinics.repository'
import { PatientsRepository } from '@/repositories/interfaces/patients.repository'
import { ServicesRepository } from '@/repositories/interfaces/services.repository'
import { EmployeesRepository } from '@/repositories/interfaces/employees.repository'
import { ResourceNotFoundError } from '@/errors/resourceNotFound.error' 

interface IRequest {
  user_id: string
  clinic_id: string
  patient_id: string
  service_id: string
  employee_id: string
  date: Date
}

interface IResponse {
  schedule: Schedule
}

export class RegisterScheduleUseCase {
  constructor(
    private schedulesRepository: SchedulesRepository, 
    private clinicsRepository: ClinicsRepository, 
    private patientsRepository: PatientsRepository, 
    private servicesRepository: ServicesRepository,
    private employeesRepository: EmployeesRepository
  ) {}

  async execute({ user_id, clinic_id, patient_id, service_id, employee_id, date }: IRequest): Promise<IResponse> {
    let clinic

    clinic = await this.clinicsRepository.findByClinicIdAndUserId(clinic_id, user_id)

    if (!clinic) {
      const employee = await this.employeesRepository.findById(user_id)

      clinic = await this.clinicsRepository.findById(employee!.clinic_id)
    }

    if (!clinic) {
      throw new ResourceNotFoundError()
    }

    const patient = await this.patientsRepository.findByPatientIdAndClinicId(patient_id, clinic_id)

    if (!patient) {
      throw new ResourceNotFoundError()
    }

    const service = await this.servicesRepository.findByServiceIdAndClinicId(service_id, clinic_id)

    if (!service) {
      throw new ResourceNotFoundError()
    }

    const employee = await this.employeesRepository.findById(employee_id)

    if (!employee) {
      throw new ResourceNotFoundError()
    }

    const schedule = await this.schedulesRepository.create({
      clinic_id,
      patient_id,
      service_id,
      employee_id,
      date
    })

    return { schedule }
  }
}
