import Router from '@/core/Router'
import BookController from '@/controllers/BookController'
import { isLoginMiddleware } from '@/middlewares/auth'

class BookRouter extends Router {
  public routes (): void {
    this.router.post('/', isLoginMiddleware, BookController.createBook)
  }
}

export default BookRouter
