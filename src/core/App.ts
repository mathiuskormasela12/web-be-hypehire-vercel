import express, { type Application } from 'express'
import helmet from 'helmet'
import compression from 'compression'
import cors, { type CorsOptions } from 'cors'
import morgan from 'morgan'
import Config from '@/config'
import AuthRouter from '@/routers/AuthRouter'
import logger from '@/helpers/logger'

class App {
  private readonly app: Application

  constructor () {
    this.app = express()

    this.app.use(helmet())
    this.app.use(compression())

    const corsOptions: CorsOptions = {
      origin: (origin, callback) => {
        if (!origin || Config.WEB_CLIENTS.includes(origin)) {
          callback(null, true)
        } else {
          callback(new Error('Blocked by cors'))
        }
      }
    }
    this.app.use(cors(corsOptions))

    this.app.use(morgan('dev'))

    const authRouter = new AuthRouter()

    this.app.use('/api/v1/auth', authRouter.router)
  }

  public listen (): void {
    this.app.listen(Config.PORT, () => {
      logger.info(`The RESTful API is being run at http://localhost:${Config.PORT}`)
    })
  }
}

export default App
