import response from '@/helpers/response'
import BookService from '@/services/BookService'
import { type Request, type Response } from 'express'

class BookController {
  public static async createBook (req: Request, res: Response): Promise<void> {
    const bookService = new BookService(req)
    const result = await bookService.createBook()
    response(res, result)
  }

  public static async createTag (req: Request, res: Response): Promise<void> {
    const bookService = new BookService(req)
    const result = await bookService.createTag()
    response(res, result)
  }

  public static async getBooks (req: Request, res: Response): Promise<void> {
    const bookService = new BookService(req)
    const result = await bookService.getBooks()
    response(res, result)
  }
}

export default BookController
