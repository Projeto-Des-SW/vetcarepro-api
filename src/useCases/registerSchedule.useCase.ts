import { Schedule } from '@prisma/client'

import { SchedulesRepository } from '@/repositories/interfaces/schedules.repository'
import { ClinicsRepository } from '@/repositories/interfaces/clinics.repository'
import { PatientsRepository } from '@/repositories/interfaces/patients.repository'
import { ServicesRepository } from '@/repositories/interfaces/services.repository'
import { ResourceNotFoundError } from '@/errors/resourceNotFound.error' 

interface IRequest {
  user_id: string
  clinic_id: string
  patient_id: string
  service_id: string
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
    private servicesRepository: ServicesRepository
  ) {}

  async execute({ user_id, clinic_id, patient_id, service_id, date }: IRequest): Promise<IResponse> {
    const clinic = await this.clinicsRepository.findByIdAndUserId(clinic_id, user_id)

    if (!clinic) {
      throw new ResourceNotFoundError()
    }

    const patient = await this.patientsRepository.findByIdAndClinicId(patient_id, clinic_id)

    if (!patient) {
      throw new ResourceNotFoundError()
    }

    const service = await this.servicesRepository.findByIdAndClinicId(service_id, clinic_id)

    if (!service) {
      throw new ResourceNotFoundError()
    }

    const schedule = await this.schedulesRepository.create({
      clinic_id,
      patient_id,
      service_id,
      date
    })

    return { schedule }
  }
}
