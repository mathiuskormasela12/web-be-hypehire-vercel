import { type Request } from 'express'

abstract class Service {
  private readonly body: Request['body']
  private readonly params: Request['params']
  private readonly query: Request['query']

  constructor (req: Request) {
    this.body = req.body
    this.params = req.params
    this.query = req.query
  }
}

export default Service
