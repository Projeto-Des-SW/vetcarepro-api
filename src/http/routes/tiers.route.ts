import { FastifyInstance } from 'fastify'

import { jwtMiddleware } from '@/http/middlewares/jwt.middleware'
import { userMiddleware } from '@/http/middlewares/user.middleware'
import { updateTierController } from '../controllers/updateTier.controller'

export async function tiersRoute(app: FastifyInstance) {
  app.addHook('onRequest', jwtMiddleware)

  app.put('/tiers', { onRequest: [userMiddleware] }, updateTierController)
}
