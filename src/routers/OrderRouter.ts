import Router from '@/core/Router'
import { isLoginMiddleware } from '@/middlewares/auth'
import { cancelOrderBookMiddleware, getOrdersBookMiddleware, orderBookMiddleware, payBookMiddleware } from '@/middlewares/order'
import OrderController from '@/controllers/OrderController'

class OrderRouter extends Router {
  public routes (): void {
    this.router.post('/', isLoginMiddleware, orderBookMiddleware, OrderController.orderBook)
    this.router.put('/:id', isLoginMiddleware, payBookMiddleware, OrderController.payBook)
    this.router.put('/cancel/:id', isLoginMiddleware, cancelOrderBookMiddleware, OrderController.cancelOrder)
    this.router.get('/:status', isLoginMiddleware, getOrdersBookMiddleware, OrderController.getOrders)
  }
}

export default OrderRouter
