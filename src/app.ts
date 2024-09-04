import fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import cookie from '@fastify/cookie'
import { ZodError } from 'zod'

import { env } from './env'
import { authenticateRoute } from './http/routes/authenticate.route'
import { clinicsRoute } from './http/routes/clinics.route'
import { employeesRoute } from './http/routes/employees.route'
import { patientsRoute } from './http/routes/patients.route'
import { profileRoute } from './http/routes/profile.route'
import { schedulesRoute } from './http/routes/schedules.route'
import { servicesRoute } from './http/routes/services.route'
import { usersRoute } from './http/routes/users.route'

export const app = fastify()

app.register(cors)
app.register(jwt, { secret: env.JWT_SECRET })
app.register(cookie)

app.register(authenticateRoute)
app.register(clinicsRoute)
app.register(employeesRoute)
app.register(patientsRoute)
app.register(profileRoute)
app.register(schedulesRoute)
app.register(servicesRoute)
app.register(usersRoute)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation Error', issues: error.format })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // ...
  }

  return reply.status(500).send({ message: 'Internal Server Error' })
})
