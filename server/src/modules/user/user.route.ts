import express from 'express'
import { processRequestBody } from 'zod-express-middleware'
import UserController from './user.controller'
import { registerUserSchema } from './user.schema'

const router = express.Router()

router.post('/', 
  processRequestBody(registerUserSchema.body),
  UserController.register)

router.get('/', UserController.getAll)

export default router
