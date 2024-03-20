import Router from '@/core/Router'
import AuthController from '@/controllers/AuthController'
import { registerAccountMiddleware } from '@/middlewares/auth'

class AuthRouter extends Router {
  public routes (): void {
    this.router.post('/register', registerAccountMiddleware, AuthController.register)
  }
}

export default AuthRouter
