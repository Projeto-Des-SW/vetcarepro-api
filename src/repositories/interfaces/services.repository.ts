import { Prisma, Service } from '@prisma/client'

export interface ServicesRepository {
  create(data: Prisma.ServiceUncheckedCreateInput): Promise<Service>
  findById(id: string): Promise<Service | null>
  findByIdAndClinicId(service_id: string, clinic_id: string): Promise<Service | null>
  findByTitleAndClinicId(title: string, clinic_id: string): Promise<Service | null>
  listByClinicId(clinic_id: string): Promise<Service[]>
}
