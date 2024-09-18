import { Prisma, Sale } from '@prisma/client'

export interface SalesRepository {
  save(data: Sale): Promise<Sale>
  create(data: Prisma.SaleUncheckedCreateInput): Promise<Sale>
  findById(id: string): Promise<Sale | null>
  findBySaleIdAndClinicId(sale_id: string, clinic_id: string): Promise<Sale | null>
  listByClinicId(clinic_id: string): Promise<Sale[]>
  listByClinicIdAndPatientId(clinic_id: string, patient_id: string): Promise<Sale[]>
}