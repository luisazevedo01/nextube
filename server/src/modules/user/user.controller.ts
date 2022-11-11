import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { RegisterUserBody } from './user.schema'
import { createUser, getUsers } from './user.service'

class UserController {
  async register(req: Request<{}, {}, RegisterUserBody>, res: Response) {
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

  async getAll(req: Request, res: Response) {
    try {
      const users = await getUsers()

      return res.status(StatusCodes.ACCEPTED).send(users)
    } catch (err: any) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(`${err.message} user.controller`)
    }
  }
}

export default new UserController()
