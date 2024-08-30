import { FastifyInstance } from 'fastify'

import { jwtMiddleware } from '@/http/middlewares/jwt.middleware'
import { authenticateUserController } from './controllers/authenticateUser.controller'
import { profileController } from './controllers/profile.controller'
import { registerUserController } from './controllers/registerUser.controller'
import { registerClinicController } from './controllers/registerClinic.controller'
import { registerServiceController } from './controllers/registerService.controller'
import { registerPatientController } from './controllers/registerPatient.controller'
import { registerScheduleController } from './controllers/registerSchedule.controller'
import { listClinicsController } from './controllers/listClinics.controller'
import { listServicesController } from './controllers/listServices.controller'
import { listPatientsController } from './controllers/listPatients.controller'
import { listSchedulesController } from './controllers/listSchedules.controller'
import { getClinicController } from './controllers/getClinic.controller'
import { getServiceController } from './controllers/getService.controller'
import { getPatientController } from './controllers/getPatient.controller'
import { getScheduleController } from './controllers/getSchedule.controller'
import { updateClinicController } from './controllers/updateClinic.controller'
import { updateServiceController } from './controllers/updateService.controller'
import { updatePatientController } from './controllers/updatePatient.controller'
import { updateScheduleController } from './controllers/updateSchedule.controller'
import { deleteScheduleController } from './controllers/deleteSchedule.controller'

export async function appRoutes(app: FastifyInstance) {
  app.post('/sessions', authenticateUserController)
  app.post('/users', registerUserController)

  app.addHook('onRequest', jwtMiddleware)
  
  app.get('/users/me', profileController)
  
  /** CLINICS */
  app.post('/clinics', registerClinicController)
  app.get('/clinics', listClinicsController)
  app.get('/clinics/:clinic_id', getClinicController)
  app.put('/clinics/:clinic_id', updateClinicController)
  /** SERVICES */
  app.post('/clinics/:clinic_id/services', registerServiceController)
  app.get('/clinics/:clinic_id/services', listServicesController)
  app.get('/clinics/:clinic_id/services/:service_id', getServiceController)
  app.put('/clinics/:clinic_id/services/:service_id', updateServiceController)
  /** PATIENTS */
  app.post('/clinics/:clinic_id/patients', registerPatientController)
  app.get('/clinics/:clinic_id/patients', listPatientsController)
  app.get('/clinics/:clinic_id/patients/:patient_id', getPatientController)
  app.put('/clinics/:clinic_id/patients/:patient_id', updatePatientController)
  /** SCHEDULES */
  app.post('/clinics/:clinic_id/schedules', registerScheduleController)
  app.get('/clinics/:clinic_id/schedules', listSchedulesController)
  app.get('/clinics/:clinic_id/schedules/:schedule_id', getScheduleController)
  app.put('/clinics/:clinic_id/schedules/:schedule_id', updateScheduleController)
  app.delete('/clinics/:clinic_id/schedules/:schedule_id', deleteScheduleController)
}
