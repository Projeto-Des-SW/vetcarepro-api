import { FastifyInstance } from 'fastify'

import { jwtMiddleware } from '@/http/middlewares/jwt.middleware'
import { registerServiceController } from '../controllers/registerService.controller'
import { listServicesController } from '../controllers/listServices.controller'
import { getServiceController } from '../controllers/getService.controller'
import { updateServiceController } from '../controllers/updateService.controller'

export async function servicesRoute(app: FastifyInstance) {
  app.addHook('onRequest', jwtMiddleware)

  app.post('/clinics/:clinic_id/services', registerServiceController)
  app.get('/clinics/:clinic_id/services', listServicesController)
  app.get('/clinics/:clinic_id/services/:service_id', getServiceController)
  app.put('/clinics/:clinic_id/services/:service_id', updateServiceController)
}
