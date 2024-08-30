import { FastifyInstance } from 'fastify'

import { jwtMiddleware } from '@/http/middlewares/jwt.middleware'
import { authenticateUserController } from '../controllers/authenticateUser.controller'
import { profileController } from '../controllers/profile.controller'
import { registerUserController } from '../controllers/registerUser.controller'

export async function usersRoute(app: FastifyInstance) {
  app.post('/sessions', authenticateUserController)
  app.post('/users', registerUserController)
  app.get('/users/me', { onRequest: [jwtMiddleware] }, profileController)
}
