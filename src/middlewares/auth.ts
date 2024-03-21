import { type Request, type NextFunction, type Response } from 'express'
import { body, validationResult } from 'express-validator'
import jwt from 'jsonwebtoken'
import logger from '@/helpers/logger'
import response from '@/helpers/response'
import Config from '@/config'

export const registerAccountMiddleware = [
  body('email', 'Email is required').notEmpty(),
  body('email', 'Email is invalid').isEmail(),
  body('password', 'Password is required').notEmpty(),
  body('password', 'Password is too weak').isStrongPassword(),
  body('repeatPassword', 'Repeat password is required').notEmpty(),
  body('repeatPassword', 'Password does not match').custom((value, { req }) => value === req.body.password),
  (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req)
    logger.error(errors)

    if (!errors.isEmpty()) {
      response(res, {
        statusCode: 400,
        errors: errors.array().map(err => err.msg)
      })
    } else {
      next()
    }
  }
]

export const loginAccountMiddleware = [
  body('email', 'Email is required').notEmpty(),
  body('email', 'Email is invalid').isEmail(),
  body('password', 'Password is required').notEmpty(),
  body('password', 'Password is too weak').isStrongPassword(),
  (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req)
    logger.error(errors)

    if (!errors.isEmpty()) {
      response(res, {
        statusCode: 400,
        errors: errors.array().map(err => err.msg)
      })
    } else {
      next()
    }
  }
]

export const isLoginMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const accessToken = req.headers['x-access-token']

  if (typeof accessToken === 'string') {
    try {
      const result = jwt.verify(accessToken, Config.ACCESS_TOKEN.KEY)
      req.app.locals.decoded = result
      next()
    } catch (err) {
      const { message } = err as Error
      response(res, {
        statusCode: 403,
        errors: [message]
      })
    }
  } else {
    response(res, {
      statusCode: 400,
      errors: ['Forbidden']
    })
  }
}

export const createTokenMiddleware = [
  body('refreshToken', 'Email is required').notEmpty(),
  body('refreshToken', 'Refresh token is invalid').isJWT(),
  (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req)
    logger.error(errors)

    if (!errors.isEmpty()) {
      response(res, {
        statusCode: 400,
        errors: errors.array().map(err => err.msg)
      })
    } else {
      next()
    }
  }
]
