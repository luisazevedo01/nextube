import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import omit from '../../helpers/omit'
import logger from '../../utils/logger'
import { findUserByEmail } from '../user/user.service'
import { LoginBody } from './auth.schema'
import { signJwt } from './auth.utils'

const DOMAIN = process.env.DOMAIN || 'localhost'

export async function loginHandler(req: Request<{}, {}, LoginBody>, res: Response) {
  const { email, password } = req.body

  // find user by email
  const user = await findUserByEmail(email)

  // check user exists
  // verify user password
  if (!user || !user?.comparePassword(password)) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .send('Invalid email or password')
  }

  // sign jwt
  const payload = omit(user.toJSON(), ['password'])

  const jwt = signJwt(payload)
  // add cookie to the Response

  res.cookie('accessToken', jwt, {
    maxAge: 3.154e10, // 1 Year
    httpOnly: true,
    domain: DOMAIN,
    path: '/',
    sameSite: 'strict',
    secure: false,
  })
  // respond

  return res.status(StatusCodes.OK).send(jwt)
}
