import { FastifyInstance } from 'fastify'

import { jwtMiddleware } from '@/http/middlewares/jwt.middleware'
import { registerSaleController } from '../controllers/registerSale.controller'
import { listSalesController } from '../controllers/listSales.controller'
import { getSaleController } from '../controllers/getSale.controller'

export async function salesRoute(app: FastifyInstance) {
  app.addHook('onRequest', jwtMiddleware)

  app.post('/clinics/:clinic_id/sales', registerSaleController)
  app.get('/clinics/:clinic_id/sales', listSalesController)
  app.get('/clinics/:clinic_id/sales/:sale_id', getSaleController)
}
