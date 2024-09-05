import { FastifyInstance } from 'fastify'

import { jwtMiddleware } from '@/http/middlewares/jwt.middleware'
import { registerPatientController } from '../controllers/registerPatient.controller'
import { listPatientsController } from '../controllers/listPatients.controller'
import { getPatientController } from '../controllers/getPatient.controller'
import { updatePatientController } from '../controllers/updatePatient.controller'
import { deletePatientController } from '../controllers/deletePatient.controller'

export async function patientsRoute(app: FastifyInstance) {
  app.addHook('onRequest', jwtMiddleware)
  
  app.post('/clinics/:clinic_id/patients', registerPatientController)
  app.get('/clinics/:clinic_id/patients', listPatientsController)
  app.get('/clinics/:clinic_id/patients/:patient_id', getPatientController)
  app.put('/clinics/:clinic_id/patients/:patient_id', updatePatientController)
  app.delete('/clinics/:clinic_id/patients/:patient_id', deletePatientController)
}
