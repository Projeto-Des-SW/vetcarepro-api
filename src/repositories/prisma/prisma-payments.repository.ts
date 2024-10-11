import { Prisma, Payment } from '@prisma/client'

import { prisma } from '@/prisma'
import { PaymentsRepository } from '../interfaces/payments.repository'

export class PrismaPaymentsRepository implements PaymentsRepository {
  async save(data: Payment) {
    return await prisma.payment.update({ 
      where: {
        id: data.id
      },
      data: {
        amount: data.amount,
        clinic: {
          connect: { id: data.clinic_id },
        },
        employee: {
          connect: { id: data.employee_id },
        },
      }
    })
  }

  async create(data: Prisma.PaymentUncheckedCreateInput) {
    return await prisma.payment.create({ data })
  }

  async findById(id: string) {
    return await prisma.payment.findUnique({
      where: {
        id
      }
    })
  }

  async listByClinicId(clinic_id: string) {
    return await prisma.payment.findMany({
      where: {
        clinic_id
      },
      orderBy: [
        {
          created_at: 'desc'
        }
      ],
      include: {
        clinic: true,
        employee: true
      }
    })
  }
}
