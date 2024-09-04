import { FastifyInstance } from 'fastify'

import { jwtMiddleware } from '@/http/middlewares/jwt.middleware'
import { profileController } from '../controllers/profile.controller'

export async function profileRoute(app: FastifyInstance) {
  app.get('/me', { onRequest: [jwtMiddleware] }, profileController)
}
