import { FastifyInstance } from 'fastify'

import { jwtMiddleware } from '@/http/middlewares/jwt.middleware'
import { userMiddleware } from '@/http/middlewares/user.middleware'
import { registerSaleController } from '../controllers/registerSale.controller'

export async function salesRoute(app: FastifyInstance) {
  app.addHook('onRequest', jwtMiddleware)

  app.post('/clinics/:clinic_id/sales', registerSaleController)
}
