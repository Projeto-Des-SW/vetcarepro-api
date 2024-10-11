import { Prisma, Payment } from '@prisma/client'

export interface PaymentsRepository {
  save(data: Payment): Promise<Payment>
  create(data: Prisma.PaymentUncheckedCreateInput): Promise<Payment>
  findById(id: string): Promise<Payment | null>
  listByClinicId(clinic_id: string): Promise<Payment[]>
}