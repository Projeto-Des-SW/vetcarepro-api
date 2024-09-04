import { FastifyReply, FastifyRequest } from 'fastify'

import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users.repository'

export async function userMiddleware(request: FastifyRequest, reply: FastifyReply) {
  const user_id = request.user.sub

  const usersRepository = new PrismaUsersRepository()
  const user = await usersRepository.findById(user_id)

  if (!user) {
    return reply.status(401).send({ message: 'Unauthorized' })
  }
}
