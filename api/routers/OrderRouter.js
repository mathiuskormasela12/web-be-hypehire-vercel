"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Router_1 = __importDefault(require("../core/Router"));
const auth_1 = require("../middlewares/auth");
const order_1 = require("../middlewares/order");
const OrderController_1 = __importDefault(require("../controllers/OrderController"));
class OrderRouter extends Router_1.default {
    routes() {
        this.router.post('/', auth_1.isLoginMiddleware, order_1.orderBookMiddleware, OrderController_1.default.orderBook);
        this.router.put('/:id', auth_1.isLoginMiddleware, order_1.payBookMiddleware, OrderController_1.default.payBook);
        this.router.put('/cancel/:id', auth_1.isLoginMiddleware, order_1.cancelOrderBookMiddleware, OrderController_1.default.cancelOrder);
        this.router.get('/:status', auth_1.isLoginMiddleware, order_1.getOrdersBookMiddleware, OrderController_1.default.getOrders);
    }
}
exports.default = OrderRouter;
