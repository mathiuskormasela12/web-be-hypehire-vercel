import AuthService from '@/services/AuthService'
import { type Request, type Response } from 'express'

class AuthController {
  public static register (req: Request, res: Response): void {
    const authService = new AuthService(req)
    const result = authService.register()
    res.status(result.statusCode).json(result)
  }
}

export default AuthController
