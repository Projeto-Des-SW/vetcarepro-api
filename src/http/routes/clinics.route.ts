import { FastifyInstance } from 'fastify'

import { jwtMiddleware } from '@/http/middlewares/jwt.middleware'
import { userMiddleware } from '@/http/middlewares/user.middleware'
import { registerClinicController } from '../controllers/registerClinic.controller'
import { listClinicsController } from '../controllers/listClinics.controller'
import { getClinicController } from '../controllers/getClinic.controller'
import { updateClinicController } from '../controllers/updateClinic.controller'
import { deleteClinicController } from '../controllers/deleteClinic.controller'

export async function clinicsRoute(app: FastifyInstance) {
  app.addHook('onRequest', jwtMiddleware)
  
  app.post('/clinics', { onRequest: [userMiddleware] }, registerClinicController)
  app.get('/clinics', listClinicsController)
  app.get('/clinics/:clinic_id', getClinicController)
  app.put('/clinics/:clinic_id', { onRequest: [userMiddleware] }, updateClinicController)
  app.delete('/clinics/:clinic_id', { onRequest: [userMiddleware] }, deleteClinicController)
}
