import { type Request, type NextFunction, type Response } from 'express'
import { body, param, validationResult } from 'express-validator'
import logger from '@/helpers/logger'
import response from '@/helpers/response'
import ORDER_STATUS from '@/constants/ORDER_STATUS'

export const orderBookMiddleware = [
  body('status', 'Status is required').notEmpty(),
  body('status', 'Status is invalid').isIn([ORDER_STATUS.SUCCESS, ORDER_STATUS.PENDING, ORDER_STATUS.CANCELED]),
  body('bookId', 'Book id is required').notEmpty(),
  body('bookId', 'Book id is invalid').isUUID(),
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

export const cancelOrderBookMiddleware = [
  param('id', 'Order id is required').notEmpty(),
  param('id', 'Order id is invalid').isUUID(),
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

export const getOrdersBookMiddleware = [
  param('status', 'Status is required').notEmpty(),
  param('status', 'Status is invalid').isIn([ORDER_STATUS.SUCCESS, ORDER_STATUS.PENDING, ORDER_STATUS.CANCELED]),
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

export const payBookMiddleware = [
  param('id', 'Order id is required').notEmpty(),
  param('id', 'Order id is invalid').isUUID(),
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
