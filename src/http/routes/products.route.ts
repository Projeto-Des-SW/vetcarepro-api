import { FastifyInstance } from 'fastify'

import { jwtMiddleware } from '@/http/middlewares/jwt.middleware'
import { userMiddleware } from '@/http/middlewares/user.middleware'
import { registerProductController } from '../controllers/registerProduct.controller'
import { updateProductController } from '../controllers/updateProduct.controller'
import { deleteProductController } from '../controllers/deleteProduct.controller'

export async function productsRoute(app: FastifyInstance) {
  app.addHook('onRequest', jwtMiddleware)

  app.post('/clinics/:clinic_id/products', { onRequest: [userMiddleware] }, registerProductController)
  app.put('/clinics/:clinic_id/products/:product_id', { onRequest: [userMiddleware] }, updateProductController)
  app.delete('/clinics/:clinic_id/products/:product_id', { onRequest: [userMiddleware] }, deleteProductController)
}
