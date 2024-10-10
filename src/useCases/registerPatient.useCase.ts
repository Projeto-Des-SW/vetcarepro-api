import { Patient } from '@prisma/client'

import { PatientsRepository } from '@/repositories/interfaces/patients.repository'
import { ClinicsRepository } from '@/repositories/interfaces/clinics.repository'
import { PatientAlreadyExistsError } from '@/errors/patientAlreadyExists.error' 
import { EmployeesRepository } from '@/repositories/interfaces/employees.repository'
import { ResourceNotFoundError } from '@/errors/resourceNotFound.error' 

interface IRequest {
  user_id: string
  clinic_id: string
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

export class RegisterPatientUseCase {
  constructor(private patientsRepository: PatientsRepository, private clinicsRepository: ClinicsRepository, private employeesRepository: EmployeesRepository) {}

  async execute({ user_id, clinic_id, name, species, age, breed, guardian_name, guardian_cpf, guardian_contact }: IRequest): Promise<IResponse> {
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

    const patient_with_same_name_and_guardian = await this.patientsRepository.findByNameAndGuardianCpfAndClinicId(name, guardian_cpf, clinic_id)

    if (patient_with_same_name_and_guardian) {
      throw new PatientAlreadyExistsError()
    }

    const patient = await this.patientsRepository.create({ 
      clinic_id,
      name,
      species,
      age, 
      breed, 
      guardian_name, 
      guardian_cpf, 
      guardian_contact
    })

    return { patient }
  }
}
