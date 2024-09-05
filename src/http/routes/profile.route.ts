import { FastifyInstance } from 'fastify'

import { jwtMiddleware } from '@/http/middlewares/jwt.middleware'
import { updateProfileController } from '../controllers/updateProfile.controller'
import { profileController } from '../controllers/getProfile.controller'

export async function profileRoute(app: FastifyInstance) {
  app.addHook('onRequest', jwtMiddleware)

  app.put('/me', updateProfileController)
  app.get('/me', profileController)
}
