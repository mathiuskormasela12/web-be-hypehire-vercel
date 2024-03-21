import fs from 'fs/promises'
import path from 'path'
import Service from '@/core/Service'
import uploadFile from '@/helpers/uploadFile'
import { type IResponseWithParams, type IResponse } from '@/interfaces/IResponse'
import { type Book } from '@prisma/client'
import Config from '@/config'

class BookService extends Service {
  public async createBook (): Promise<IResponse> {
    const photo = await uploadFile(/png|jpg|jpeg/gi, this.files, 'photo')

    if (typeof photo === 'string') {
      try {
        const [books, tags] = await Promise.all([
          this.prisma.book.findMany({
            where: {
              title: String(this.body.title).toLowerCase()
            }
          }),
          this.prisma.tag.findMany({
            where: {
              id: this.body.tagId
            }
          })
        ])

        if (books.length === 0 && tags.length > 0) {
          const result = await this.prisma.book.create({
            data: {
              title: String(this.body.title).toLowerCase(),
              writer: this.body.writer,
              price: Number(this.body.price),
              image: photo
            }
          })
          await this.prisma.bookTag.create({
            data: {
              bookId: result.id,
              tagId: this.body.tagId
            }
          })

          return {
            statusCode: 201,
            message: 'Book created successfully'
          }
        } else if (tags.length === 0) {
          try {
            await fs.unlink(path.join(__dirname, '../../public/' + photo))
            return {
              statusCode: 400,
              message: 'Tag is unknown'
            }
          } catch (err) {
            const { message } = err as Error
            return {
              statusCode: 500,
              errors: [message]
            }
          }
        } else {
          try {
            await fs.unlink(path.join(__dirname, '../../public/' + photo))
            return {
              statusCode: 400,
              message: 'Book already exists'
            }
          } catch (err) {
            const { message } = err as Error
            return {
              statusCode: 500,
              errors: [message]
            }
          }
        }
      } catch (err) {
        const { message } = err as Error
        try {
          await fs.unlink(path.join(__dirname, '../../public/' + photo))
          return {
            statusCode: 400,
            message
          }
        } catch (err) {
          const { message } = err as Error
          return {
            statusCode: 500,
            errors: [message]
          }
        }
      }
    } else {
      return photo
    }
  }

  public async createTag (): Promise<IResponse> {
    try {
      const tags = await this.prisma.tag.findMany({
        where: {
          name: this.body?.name?.toLowerCase()
        }
      })

      if (tags.length === 0) {
        await this.prisma.tag.create({
          data: {
            name: this.body?.name?.toLowerCase()
          }
        })

        return {
          statusCode: 201,
          message: 'Tag created successfully'
        }
      } else {
        return {
          statusCode: 400,
          message: 'Tag already exists'
        }
      }
    } catch (err) {
      const { message } = err as Error
      return {
        statusCode: 500,
        errors: [message]
      }
    }
  }

  public async getBooks (): Promise<IResponseWithParams<Book[]>> {
    try {
      const books = await this.prisma.book.findMany({
        where: {
          title: {
            contains: this.query.keyword as string
          }
        },
        include: {
          bookTag: {
            include: {
              tag: true
            }
          }
        }
      })

      return {
        statusCode: 200,
        data: books.map(item => ({
          ...item,
          image: `${Config.APP_URL}/static/${item.image}`
        }))
      }
    } catch (err) {
      const { message } = err as Error
      return {
        statusCode: 500,
        errors: [message]
      }
    }
  }
}

export default BookService
