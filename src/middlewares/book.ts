import { type Request, type NextFunction, type Response } from 'express'
import { body, validationResult } from 'express-validator'
import logger from '@/helpers/logger'
import response from '@/helpers/response'

export const createBookMiddleware = [
  body('title', 'Title is required').notEmpty(),
  body('title', 'Title should be a string').isString(),
  body('writer', 'Writer is required').notEmpty(),
  body('writer', 'Writer should be a string').isString(),
  body('price', 'Price is requirerd').notEmpty(),
  body('price', 'Price should be a number').isNumeric(),
  body('tagId', 'Tag is required').notEmpty(),
  body('tagId', 'Tag is invalid').isUUID(),
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

export const createTagMiddleware = [
  body('name', 'Tag name is required').notEmpty(),
  body('name', 'Tag name should be a string').isString(),
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
