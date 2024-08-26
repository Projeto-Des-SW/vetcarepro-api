import { FastifyInstance } from 'fastify'

import { jwtMiddleware } from '@/http/middlewares/jwt.middleware'
import { authenticateUserController } from './controllers/authenticateUser.controller'
import { registerUserController } from './controllers/registerUser.controller'
import { profileController } from './controllers/profile.controller'
import { registerClinicController } from './controllers/registerClinic.controller'
import { registerServiceController } from './controllers/registerService.controller'
import { registerPatientController } from './controllers/registerPatient.controller'
import { registerScheduleController } from './controllers/registerSchedule.controller'

export async function appRoutes(app: FastifyInstance) {
  app.post('/sessions', authenticateUserController)
  app.post('/users', registerUserController)

  app.addHook('onRequest', jwtMiddleware)

  app.get('/users/me', profileController)
  app.post('/clinics', registerClinicController)
  app.post('/clinics/:clinic_id/services', registerServiceController)
  app.post('/clinics/:clinic_id/patients', registerPatientController)
  app.post('/clinics/:clinic_id/schedules', registerScheduleController)
}
