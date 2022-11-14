import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { findUserByEmail } from '../user/user.service'

export async function loginHandler(req: Request, res: Response) {
  const { email, password } = req.body

  // find user by email
  const user = await findUserByEmail(email)

  // check user exists
  if(!user || !user.comparePassword(password)){
    return res.status(StatusCodes.UNAUTHORIZED).send('Invalid email or password')
  }
  // verify user password

  // sign jwt

  // add cookie to the Response

  // respond
}
