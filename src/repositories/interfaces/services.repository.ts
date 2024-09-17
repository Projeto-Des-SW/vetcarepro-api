import { Prisma, Service } from '@prisma/client'

export interface ServicesRepository {
  save(data: Service): Promise<Service>
  create(data: Prisma.ServiceUncheckedCreateInput): Promise<Service>
  findById(id: string): Promise<Service | null>
  findByTitleAndClinicId(title: string, clinic_id: string): Promise<Service | null>
  findByServiceIdAndClinicId(service_id: string, clinic_id: string): Promise<Service | null>
  listByClinicId(clinic_id: string): Promise<Service[]>
}
