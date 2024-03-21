import response from '@/helpers/response'
import OrderService from '@/services/OrderService'
import { type Request, type Response } from 'express'

class OrderController {
  public static async orderBook (req: Request, res: Response): Promise<void> {
    const orderService = new OrderService(req)
    const result = await orderService.orderBook()
    response(res, result)
  }

  public static async cancelOrder (req: Request, res: Response): Promise<void> {
    const orderService = new OrderService(req)
    const result = await orderService.cancelOrder()
    response(res, result)
  }

  public static async getOrders (req: Request, res: Response): Promise<void> {
    const orderService = new OrderService(req)
    const result = await orderService.getOrders()
    response(res, result)
  }

  public static async payBook (req: Request, res: Response): Promise<void> {
    const orderService = new OrderService(req)
    const result = await orderService.payBook()
    response(res, result)
  }
}

export default OrderController
