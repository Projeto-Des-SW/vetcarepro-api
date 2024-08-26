import { Prisma } from '@prisma/client'

import { prisma } from '@/lib/prisma'
import { PatientsRepository } from '../interfaces/patients.repository'

export class PrismaPatientsRepository implements PatientsRepository {
  async create(data: Prisma.PatientUncheckedCreateInput) {
    return await prisma.patient.create({ data })
  }

  async findById(id: string) {
    return await prisma.patient.findUnique({
      where: {
        id
      }
    })
  }

  async findByIdAndClinicId(patient_id: string, clinic_id: string) {
    return await prisma.patient.findUnique({
      where: {
        id: patient_id,
        clinic_id
      }
    })
  }

  async findByNameAndGuardianCpfAndClinicId(name: string, guardian_cpf: string, clinic_id: string) {
    return await prisma.patient.findFirst({
      where: {
        name,
        guardian_cpf,
        clinic_id
      }
    })
  }

  async listByClinicId(clinic_id: string) {
    return await prisma.patient.findMany({
      where: {
        clinic_id,
      }
    })
  }
}
