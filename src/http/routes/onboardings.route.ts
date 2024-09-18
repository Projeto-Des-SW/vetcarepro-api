import { FastifyInstance } from 'fastify'

import { jwtMiddleware } from '@/http/middlewares/jwt.middleware'
import { updateOnboardingController } from '../controllers/updateOnboarding.controller'

export async function onboardingsRoute(app: FastifyInstance) {
  app.addHook('onRequest', jwtMiddleware)

  app.put('/onboardings', updateOnboardingController)
}
