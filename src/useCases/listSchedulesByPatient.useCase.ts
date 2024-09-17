import { Schedule } from '@prisma/client'

import { SchedulesRepository } from '@/repositories/interfaces/schedules.repository'
import { ClinicsRepository } from '@/repositories/interfaces/clinics.repository'
import { EmployeesRepository } from '@/repositories/interfaces/employees.repository'
import { PatientsRepository } from '@/repositories/interfaces/patients.repository'
import { ResourceNotFoundError } from '@/errors/resourceNotFound.error'

interface IRequest {
  user_id: string
  clinic_id: string
  patient_id: string
}

interface IResponse {
  schedules: Schedule[]
}

export class ListSchedulesByPatientUseCase {
  constructor(private schedulesRepository: SchedulesRepository, private clinicsRepository: ClinicsRepository, private employeesRepository: EmployeesRepository, private patientsRepository: PatientsRepository) {}

  async execute({ user_id, clinic_id, patient_id }: IRequest): Promise<IResponse> {
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

    const schedules = await this.schedulesRepository.listByClinicIdAndPatientId(clinic_id, patient_id)

    return { schedules }
  }
}
