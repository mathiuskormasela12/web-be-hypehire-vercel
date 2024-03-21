import { PrismaClient } from '@prisma/client'
import { type Request } from 'express'

abstract class Service {
  protected readonly body: Request['body']
  protected readonly params: Request['params']
  protected readonly query: Request['query']
  protected readonly headers: Request['headers']
  protected readonly locals: Request['app']['locals']
  protected readonly prisma: PrismaClient

  constructor (req: Request) {
    this.body = req.body
    this.params = req.params
    this.query = req.query
    this.headers = req.headers
    this.locals = req?.app?.locals
    this.prisma = new PrismaClient()
  }
}

export default Service
