import { Prisma, Clinic } from '@prisma/client'

export interface ClinicsRepository {
  delete(clinic_id: string): Promise<void>
  save(data: Clinic): Promise<Clinic>
  create(data: Prisma.ClinicUncheckedCreateInput): Promise<Clinic>
  findById(id: string): Promise<Clinic | null>
  findByTitle(title: string): Promise<Clinic | null>
  findByDocument(cnpj: string): Promise<Clinic | null>
  findByClinicIdAndUserId(clinic_id: string, user_id: string): Promise<Clinic | null>
  listByUserId(user_id: string): Promise<Clinic[]>
}
