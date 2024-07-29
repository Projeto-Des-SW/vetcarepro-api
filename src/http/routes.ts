import { FastifyInstance } from 'fastify'

import { authenticateUserController } from './controllers/authenticateUser.controller'
import { registerUserController } from './controllers/registerUser.controller'

export async function appRoutes(app: FastifyInstance) {
  app.post('/sessions', authenticateUserController)
  app.post('/users', registerUserController)
}
