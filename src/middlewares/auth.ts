import { type Request, type NextFunction, type Response } from 'express'
import { body, validationResult } from 'express-validator'

export const registerAccountMiddleware = [
  body('email', 'Email is required').isLength({
    min: 1
  }),
  body('email', 'Email is invalid').isEmail(),
  body('password', 'Password is required').notEmpty(),
  body('password', 'Password is too weak').isStrongPassword(),
  (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      res.status(400).json({
        statusCode: 400,
        errors: errors.array().map(item => item.msg)
      })
    } else {
      next()
    }
  }
]
