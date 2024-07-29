import { Prisma } from '@prisma/client'

import { prisma } from '@/lib/prisma'
import { UsersRepository } from '../interfaces/users.repository'

export class PrismaUsersRepository implements UsersRepository {
  async create(data: Prisma.UserCreateInput) {
    return await prisma.user.create({ data })
  }

  async findById(id: string) {
    return await prisma.user.findUnique({
      where: {
        id
      }
    })
  }

  async findByEmail(email: string) {
    return await prisma.user.findUnique({
      where: {
        email
      }
    })
  }
}
