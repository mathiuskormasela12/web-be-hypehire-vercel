import Service from '@/core/Service'
import { type IResponse } from '@/interfaces/IResponse'

class AuthService extends Service {
  public register (): IResponse {
    return {
      statusCode: 201,
      message: 'Register successfully'
    }
  }
}

export default AuthService
