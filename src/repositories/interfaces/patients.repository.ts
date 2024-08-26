import { Prisma, Patient } from '@prisma/client'

export interface PatientsRepository {
  create(data: Prisma.PatientUncheckedCreateInput): Promise<Patient>
  findById(id: string): Promise<Patient | null>
  findByIdAndClinicId(patient_id: string, clinic_id: string): Promise<Patient | null>
  findByNameAndGuardianCpfAndClinicId(name: string, guardian_cpf: string, clinic_id: string): Promise<Patient | null>
  listByClinicId(clinic_id: string): Promise<Patient[]>
}