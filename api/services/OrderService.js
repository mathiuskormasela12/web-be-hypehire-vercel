"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../config"));
const ORDER_STATUS_1 = __importDefault(require("../constants/ORDER_STATUS"));
const Service_1 = __importDefault(require("../core/Service"));
class OrderService extends Service_1.default {
    async orderBook() {
        try {
            const books = await this.prisma.book.findMany({
                where: {
                    id: this.body.bookId
                }
            });
            if (books.length > 0) {
                try {
                    await this.prisma.order.create({
                        data: {
                            status: ORDER_STATUS_1.default.PENDING,
                            userId: this.locals.decoded.code,
                            bookId: this.body.bookId
                        }
                    });
                    return {
                        statusCode: 200,
                        message: `${books[0].title} book is ordered`
                    };
                }
                catch (err) {
                    const { message } = err;
                    return {
                        statusCode: 500,
                        errors: [message]
                    };
                }
            }
            else {
                return {
                    statusCode: 400,
                    errors: ['Body is unkown']
                };
            }
        }
        catch (err) {
            const { message } = err;
            return {
                statusCode: 500,
                errors: [message]
            };
        }
    }
    async cancelOrder() {
        try {
            const order = await this.prisma.order.findUnique({
                where: {
                    id: this.params.id
                }
            });
            if (order) {
                await this.prisma.order.update({
                    where: {
                        id: this.params.id
                    },
                    data: {
                        status: ORDER_STATUS_1.default.CANCELED
                    }
                });
                return {
                    statusCode: 200,
                    message: 'Your order is cancelled successfully'
                };
            }
            else {
                return {
                    statusCode: 400,
                    message: 'Your order is not found'
                };
            }
        }
        catch (err) {
            const { message } = err;
            return {
                statusCode: 500,
                errors: [message]
            };
        }
    }
    async payBook() {
        try {
            const order = await this.prisma.order.findUnique({
                where: {
                    id: this.params.id
                }
            });
            if (order) {
                await this.prisma.order.update({
                    where: {
                        id: this.params.id
                    },
                    data: {
                        status: ORDER_STATUS_1.default.SUCCESS
                    }
                });
                return {
                    statusCode: 200,
                    message: 'Payment successfully'
                };
            }
            else {
                return {
                    statusCode: 400,
                    message: 'Your order is not found'
                };
            }
        }
        catch (err) {
            const { message } = err;
            return {
                statusCode: 500,
                errors: [message]
            };
        }
    }
    async getOrders() {
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
            });
            return {
                statusCode: 200,
                data: orders.map(order => ({
                    ...order,
                    book: {
                        ...order.book,
                        image: `${config_1.default.APP_URL}/static/${order.book.image}`
                    }
                }))
            };
        }
        catch (err) {
            const { message } = err;
            return {
                statusCode: 500,
                errors: [message]
            };
        }
    }
}
exports.default = OrderService;
