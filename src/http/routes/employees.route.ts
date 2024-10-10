import { FastifyInstance } from 'fastify'

import { jwtMiddleware } from '@/http/middlewares/jwt.middleware'
import { userMiddleware } from '@/http/middlewares/user.middleware'
import { registerEmployeeController } from '../controllers/registerEmployee.controller'
import { getEmployeeController } from '../controllers/getEmployee.controller'
import { listEmployeesController } from '../controllers/listEmployees.controller'
import { updateEmployeeController } from '../controllers/updateEmployee.controller'
import { deleteEmployeeController } from '../controllers/deleteEmployee.controller'

export async function employeesRoute(app: FastifyInstance) {
  app.addHook('onRequest', jwtMiddleware)

  app.post('/clinics/:clinic_id/employees', registerEmployeeController)
  app.get('/clinics/:clinic_id/employees', listEmployeesController)
  app.get('/clinics/:clinic_id/employees/:employee_id', getEmployeeController)
  app.put('/clinics/:clinic_id/employees/:employee_id', updateEmployeeController)
  app.delete('/clinics/:clinic_id/employees/:employee_id', deleteEmployeeController)
}
