import { Prisma, Employee } from '@prisma/client'

import { prisma } from '@/prisma'
import { EmployeesRepository } from '../interfaces/employees.repository'

export class PrismaEmployeesRepository implements EmployeesRepository {
  async save(data: Employee) {
    return await prisma.employee.update({ 
      where: {
        id: data.id
      },
      data
    })
  }

  async create(data: Prisma.EmployeeUncheckedCreateInput) {
    return await prisma.employee.create({ data })
  }

  async findById(id: string) {
    return await prisma.employee.findUnique({
      where: {
        id
      }
    })
  }

  async findByEmail(email: string) {
    return await prisma.employee.findUnique({
      where: {
        email
      }
    })
  }

  async findByEmployeeIdAndClinicId(employee_id: string, clinic_id: string) {
    return await prisma.employee.findUnique({
      where: {
        id: employee_id,
        clinic_id
      }
    })
  }

  async findByEmployeeIdAndClinicIdWithoutPassword(employee_id: string, clinic_id: string) {
    return await prisma.employee.findUnique({
      where: {
        id: employee_id,
        clinic_id
      },
      select: {
        id: true,
        name: true,
        email: true,
        position: true,
        salary: true,
        last_payment_date: true,
        status: true,
        onboarding: true,
        created_at: true,
        updated_at: true,
        clinic_id: true
      }
    })
  }

  async listByClinicId(clinic_id: string) {
    return await prisma.employee.findMany({
      where: {
        clinic_id,
        status: true
      },
      select: {
        id: true,
        name: true,
        email: true,
        position: true,
        salary: true,
        last_payment_date: true,
        status: true,
        onboarding: true,
        created_at: true,
        updated_at: true,
        clinic_id: true
      },
      orderBy: [
        {
          name: 'asc'
        }
      ]
    })
  }
}
