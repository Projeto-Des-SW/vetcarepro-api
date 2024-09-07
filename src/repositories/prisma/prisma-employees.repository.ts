import { Prisma, Employee } from '@prisma/client'

import { prisma } from '@/lib/prisma'
import { EmployeesRepository } from '../interfaces/employees.repository'

export class PrismaEmployeesRepository implements EmployeesRepository {
  async delete(employee_id: string) {
    await prisma.employee.delete({
      where: {
        id: employee_id
      }
    })
  }

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

  async listByClinicId(clinic_id: string) {
    return await prisma.employee.findMany({
      where: {
        clinic_id
      },
      orderBy: [
        {
          name: 'asc'
        }
      ]
    })
  }
}
