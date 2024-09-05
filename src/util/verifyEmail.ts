import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users.repository'
import { PrismaEmployeesRepository } from '@/repositories/prisma/prisma-employees.repository'

async function verifyEmail(email: string) {
  const usersRepository = new PrismaUsersRepository()
  const employeesRepository = new PrismaEmployeesRepository()

  const user = await usersRepository.findByEmail(email)
  const employee = await employeesRepository.findByEmail(email)

  return !!user || !!employee
}

async function verifyEmailAndReturnUserId(email: string) {
  const usersRepository = new PrismaUsersRepository()
  const employeesRepository = new PrismaEmployeesRepository()

  const user = await usersRepository.findByEmail(email)
  const employee = await employeesRepository.findByEmail(email)

  if (user) {
    return { 
      id: user.id
    }
  }

  if (employee) {
    return { 
      id: employee.id
    }
  }
}

export { verifyEmail, verifyEmailAndReturnUserId }