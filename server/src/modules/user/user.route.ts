import express from 'express'
import { processRequestBody } from 'zod-express-middleware'
import requireUser from '../../middleware/requireUser'
import UserController from './user.controller'
import { registerUserSchema } from './user.schema'

const userRouter = express.Router()

userRouter.get('/', requireUser, (req, res) => {
  return res.send(res.locals.user)
})

userRouter.post(
  '/',
  processRequestBody(registerUserSchema.body),
  UserController.register
)

//router.get('/', UserController.getAll)

export default userRouter 
