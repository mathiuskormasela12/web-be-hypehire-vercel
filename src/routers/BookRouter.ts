import RouterWithUploadFile from '@/core/RouterWithUploadFile'
import BookController from '@/controllers/BookController'
import { isLoginMiddleware } from '@/middlewares/auth'
import { createBookMiddleware, createTagMiddleware } from '@/middlewares/book'

class BookRouter extends RouterWithUploadFile {
  public routes (): void {
    this.router.post('/', isLoginMiddleware, createBookMiddleware, BookController.createBook)
    this.router.get('/', isLoginMiddleware, BookController.getBooks)
    this.router.post('/tag', isLoginMiddleware, createTagMiddleware, BookController.createTag)
  }
}

export default BookRouter
