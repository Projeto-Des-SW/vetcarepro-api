import { Patient } from '@prisma/client'

import { PatientsRepository } from '@/repositories/interfaces/patients.repository'
import { ClinicsRepository } from '@/repositories/interfaces/clinics.repository'
import { EmployeesRepository } from '@/repositories/interfaces/employees.repository'
import { ResourceNotFoundError } from '@/errors/resourceNotFound.error'

interface IRequest {
  user_id: string
  clinic_id: string
  patient_id: string
  name: string
  species: string
  age: string
  breed: string
  guardian_name: string
  guardian_cpf: string
  guardian_contact: string
}

interface IResponse {
  patient: Patient
}

export class UpdatePatientUseCase {
  constructor(private patientsRepository: PatientsRepository, private clinicsRepository: ClinicsRepository, private employeesRepository: EmployeesRepository) {}

  async execute({ user_id, clinic_id, patient_id, name, species, age, breed, guardian_cpf, guardian_name, guardian_contact }: IRequest): Promise<IResponse> {
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

    patient.name = name
    patient.species = species
    patient.age = age
    patient.breed = breed
    patient.guardian_cpf = guardian_cpf
    patient.guardian_name = guardian_name
    patient.guardian_contact = guardian_contact
    await this.patientsRepository.save(patient)

    return { patient }
  }
}
