import { FastifyInstance } from 'fastify'

import { registerUserController } from '../controllers/registerUser.controller'

export async function usersRoute(app: FastifyInstance) {
  app.post('/users', registerUserController)
}
