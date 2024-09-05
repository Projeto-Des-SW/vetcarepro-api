import { FastifyInstance } from 'fastify'

import { jwtMiddleware } from '@/http/middlewares/jwt.middleware'
import { userMiddleware } from '@/http/middlewares/user.middleware'
import { registerServiceController } from '../controllers/registerService.controller'
import { listServicesController } from '../controllers/listServices.controller'
import { getServiceController } from '../controllers/getService.controller'
import { updateServiceController } from '../controllers/updateService.controller'
import { deleteServiceController } from '../controllers/deleteService.controller'

export async function servicesRoute(app: FastifyInstance) {
  app.addHook('onRequest', jwtMiddleware)

  app.post('/clinics/:clinic_id/services', { onRequest: [userMiddleware] }, registerServiceController)
  app.get('/clinics/:clinic_id/services', listServicesController)
  app.get('/clinics/:clinic_id/services/:service_id', getServiceController)
  app.put('/clinics/:clinic_id/services/:service_id', { onRequest: [userMiddleware] }, updateServiceController)
  app.delete('/clinics/:clinic_id/services/:service_id', { onRequest: [userMiddleware] }, deleteServiceController)
}
