import express, { type Application } from 'express'
import helmet from 'helmet'
import compression from 'compression'
import cors, { type CorsOptions } from 'cors'
import morgan from 'morgan'
import path from 'path'
import Config from '@/config'
import AuthRouter from '@/routers/AuthRouter'
import logger from '@/helpers/logger'
import BookRouter from '@/routers/BookRouter'
import OrderRouter from '@/routers/OrderRouter'

class App {
  private readonly app: Application

  constructor () {
    this.app = express()

    // Setup Helmet
    this.app.use(helmet())

    // Setup Compression
    this.app.use(compression())

    // Setup Cors
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

    // Setup Morgan
    this.app.use(morgan('dev'))

    // Setup Url-Encoded & Json
    this.app.use(express.urlencoded({ extended: false }))
    this.app.use(express.json())

    // Setup Static File
    this.app.use('/static', express.static(path.join(__dirname, '../../public')))

    const authRouter = new AuthRouter()
    const bookRouter = new BookRouter()
    const orderRouter = new OrderRouter()

    this.app.use('/api/v1/auth', authRouter.router)
    this.app.use('/api/v1/book', bookRouter.router)
    this.app.use('/api/v1/order', orderRouter.router)
  }

  public listen (): void {
    this.app.listen(Config.PORT, () => {
      logger.info(`The RESTful API is being run at http://localhost:${Config.PORT}`)
    })
  }
}

export default App
