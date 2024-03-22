"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const response_1 = __importDefault(require("../helpers/response"));
const OrderService_1 = __importDefault(require("../services/OrderService"));
class OrderController {
    static async orderBook(req, res) {
        const orderService = new OrderService_1.default(req);
        const result = await orderService.orderBook();
        (0, response_1.default)(res, result);
    }
    static async cancelOrder(req, res) {
        const orderService = new OrderService_1.default(req);
        const result = await orderService.cancelOrder();
        (0, response_1.default)(res, result);
    }
    static async getOrders(req, res) {
        const orderService = new OrderService_1.default(req);
        const result = await orderService.getOrders();
        (0, response_1.default)(res, result);
    }
    static async payBook(req, res) {
        const orderService = new OrderService_1.default(req);
        const result = await orderService.payBook();
        (0, response_1.default)(res, result);
    }
}
exports.default = OrderController;
