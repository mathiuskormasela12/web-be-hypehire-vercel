import response from '@/helpers/response'
import BookService from '@/services/BookService'
import { type Request, type Response } from 'express'

class BookController {
  public static createBook (req: Request, res: Response): void {
    const bookService = new BookService(req)
    const result = bookService.createBook()
    response(res, result)
  }
}

export default BookController
