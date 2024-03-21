import { Router as ExpressRouter } from 'express'
import expressFileUpload from 'express-fileupload'

abstract class RouterWithUploadFile {
  private readonly routerApp: ExpressRouter

  constructor () {
    this.routerApp = ExpressRouter()

    // Setup File Upload
    this.routerApp.use(expressFileUpload({
      createParentPath: true
    }))

    this.routes()
  }

  public abstract routes (): void

  public get router (): ExpressRouter {
    return this.routerApp
  }
}

export default RouterWithUploadFile
