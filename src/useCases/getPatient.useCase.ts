import { Patient } from '@prisma/client'

import { PatientsRepository } from '@/repositories/interfaces/patients.repository'
import { ClinicsRepository } from '@/repositories/interfaces/clinics.repository'
import { ResourceNotFoundError } from '@/errors/resourceNotFound.error'

interface IRequest {
  user_id: string
  clinic_id: string
  patient_id: string
}

interface IResponse {
  patient: Patient
}

export class GetPatientUseCase {
  constructor(private patientsRepository: PatientsRepository, private clinicsRepository: ClinicsRepository) {}

  async execute({ user_id, clinic_id, patient_id }: IRequest): Promise<IResponse> {
    const clinic = await this.clinicsRepository.findByIdAndUserId(clinic_id, user_id)

    if (!clinic) {
      throw new ResourceNotFoundError()
    }

    const patient = await this.patientsRepository.findByIdAndClinicId(patient_id, clinic_id)

    if (!patient) {
      throw new ResourceNotFoundError()
    }

    return { patient }
  }
}
