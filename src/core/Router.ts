import { Router as ExpressRouter } from 'express'

abstract class Router {
  private readonly routerApp: ExpressRouter

  constructor () {
    this.routerApp = ExpressRouter()
    this.routes()
  }

  public abstract routes (): void

  public get router (): ExpressRouter {
    return this.routerApp
  }
}

export default Router
