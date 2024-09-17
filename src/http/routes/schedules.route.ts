import { FastifyInstance } from 'fastify'

import { jwtMiddleware } from '@/http/middlewares/jwt.middleware'
import { registerScheduleController } from '../controllers/registerSchedule.controller'
import { listSchedulesController } from '../controllers/listSchedules.controller'
import { listSchedulesByPatientController } from '../controllers/listSchedulesByPatient.controller'
import { getScheduleController } from '../controllers/getSchedule.controller'
import { updateScheduleController } from '../controllers/updateSchedule.controller'
import { deleteScheduleController } from '../controllers/deleteSchedule.controller'

export async function schedulesRoute(app: FastifyInstance) {
  app.addHook('onRequest', jwtMiddleware)
  
  app.post('/clinics/:clinic_id/schedules', registerScheduleController)
  app.get('/clinics/:clinic_id/schedules', listSchedulesController)
  app.get('/clinics/:clinic_id/patients/:patient_id/schedules', listSchedulesByPatientController)
  app.get('/clinics/:clinic_id/schedules/:schedule_id', getScheduleController)
  app.put('/clinics/:clinic_id/schedules/:schedule_id', updateScheduleController)
  app.delete('/clinics/:clinic_id/schedules/:schedule_id', deleteScheduleController)
}
