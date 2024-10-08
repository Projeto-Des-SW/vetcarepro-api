

import { FastifyInstance } from 'fastify'

import { jwtMiddleware } from '@/http/middlewares/jwt.middleware'
import { getFinancesController } from '../controllers/getFinances.controller'

export async function financesRoute(app: FastifyInstance) {
  app.addHook('onRequest', jwtMiddleware)

  app.get('/clinics/:clinic_id/finances', getFinancesController)
}
