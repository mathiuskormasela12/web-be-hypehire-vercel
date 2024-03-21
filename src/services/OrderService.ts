import Config from '@/config'
import ORDER_STATUS from '@/constants/ORDER_STATUS'
import Service from '@/core/Service'
import { type IResponseWithParams, type IResponse } from '@/interfaces/IResponse'
import { type Order } from '@prisma/client'

class OrderService extends Service {
  public async orderBook (): Promise<IResponse> {
    try {
      const books = await this.prisma.book.findMany({
        where: {
          id: this.body.bookId
        }
      })

      if (books.length > 0) {
        try {
          await this.prisma.order.create({
            data: {
              status: ORDER_STATUS.PENDING,
              userId: this.locals.decoded.code,
              bookId: this.body.bookId
            }
          })

          return {
            statusCode: 200,
            message: `${books[0].title} book is ordered`
          }
        } catch (err) {
          const { message } = err as Error
          return {
            statusCode: 500,
            errors: [message]
          }
        }
      } else {
        return {
          statusCode: 400,
          errors: ['Body is unkown']
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

  public async cancelOrder (): Promise<IResponse> {
    try {
      const order = await this.prisma.order.findUnique({
        where: {
          id: this.params.id
        }
      })

      if (order) {
        await this.prisma.order.update({
          where: {
            id: this.params.id
          },
          data: {
            status: ORDER_STATUS.CANCELED
          }
        })

        return {
          statusCode: 200,
          message: 'Your order is cancelled successfully'
        }
      } else {
        return {
          statusCode: 400,
          message: 'Your order is not found'
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

  public async payBook (): Promise<IResponse> {
    try {
      const order = await this.prisma.order.findUnique({
        where: {
          id: this.params.id
        }
      })

      if (order) {
        await this.prisma.order.update({
          where: {
            id: this.params.id
          },
          data: {
            status: ORDER_STATUS.SUCCESS
          }
        })

        return {
          statusCode: 200,
          message: 'Payment successfully'
        }
      } else {
        return {
          statusCode: 400,
          message: 'Your order is not found'
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

  public async getOrders (): Promise<IResponseWithParams<Order[]>> {
    try {
      const orders = await this.prisma.order.findMany({
        where: {
          status: this.params.status,
          userId: this.locals.decoded.code
        },
        include: {
          book: {
            include: {
              bookTag: {
                include: {
                  tag: true
                }
              }
            }
          }
        }
      })

      return {
        statusCode: 200,
        data: orders.map(order => ({
          ...order,
          book: {
            ...order.book,
            image: `${Config.APP_URL}/static/${order.book.image}`
          }
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

export default OrderService
