import Service from '@/core/Service'
import logger from '@/helpers/logger'
import { type IResponse } from '@/interfaces/IResponse'

class BookService extends Service {
  public createBook (): IResponse {
    logger.info(this.locals)
    return {
      statusCode: 200,
      message: 'Create Books'
    }
  }
}

export default BookService
