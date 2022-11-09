import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { UserModel } from './user.model'
import { createUser } from './user.service'

class UserController {
  async register(req: Request, res: Response) {
    const { username, email, password } = req.body

    try {
      await createUser({ username, email, password })

      res.status(StatusCodes.CREATED).send('user created successfully')
    } catch (e: any) {
      if (e.code === 11000) {
        return res.status(StatusCodes.CONFLICT).send('User already exists')
      }

      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(`${e.message} user.controller`)
    }
  }

  async getUsers(req: Request, res: Response) {
    try {
      const users = UserModel.find()

      return res.status(StatusCodes.ACCEPTED).json(users.data)
    } catch (e: any) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(`${e.message} user.controller`)
    }
  }
}

export default new UserController()
