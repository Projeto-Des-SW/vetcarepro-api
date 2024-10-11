import { FastifyInstance } from 'fastify'

import { jwtMiddleware } from '@/http/middlewares/jwt.middleware'
import { registerPaymentController } from '../controllers/registerPayment.controller'

export async function paymentsRoute(app: FastifyInstance) {
  app.addHook('onRequest', jwtMiddleware)
  
  app.post('/clinics/:clinic_id/employees/:employee_id/payments', registerPaymentController)
}
