"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.payBookMiddleware = exports.getOrdersBookMiddleware = exports.cancelOrderBookMiddleware = exports.orderBookMiddleware = void 0;
const express_validator_1 = require("express-validator");
const logger_1 = __importDefault(require("../helpers/logger"));
const response_1 = __importDefault(require("../helpers/response"));
const ORDER_STATUS_1 = __importDefault(require("../constants/ORDER_STATUS"));
exports.orderBookMiddleware = [
    (0, express_validator_1.body)('status', 'Status is required').notEmpty(),
    (0, express_validator_1.body)('status', 'Status is invalid').isIn([ORDER_STATUS_1.default.SUCCESS, ORDER_STATUS_1.default.PENDING, ORDER_STATUS_1.default.CANCELED]),
    (0, express_validator_1.body)('bookId', 'Book id is required').notEmpty(),
    (0, express_validator_1.body)('bookId', 'Book id is invalid').isUUID(),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        logger_1.default.error(errors);
        if (!errors.isEmpty()) {
            (0, response_1.default)(res, {
                statusCode: 400,
                errors: errors.array().map(err => err.msg)
            });
        }
        else {
            next();
        }
    }
];
exports.cancelOrderBookMiddleware = [
    (0, express_validator_1.param)('id', 'Order id is required').notEmpty(),
    (0, express_validator_1.param)('id', 'Order id is invalid').isUUID(),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        logger_1.default.error(errors);
        if (!errors.isEmpty()) {
            (0, response_1.default)(res, {
                statusCode: 400,
                errors: errors.array().map(err => err.msg)
            });
        }
        else {
            next();
        }
    }
];
exports.getOrdersBookMiddleware = [
    (0, express_validator_1.param)('status', 'Status is required').notEmpty(),
    (0, express_validator_1.param)('status', 'Status is invalid').isIn([ORDER_STATUS_1.default.SUCCESS, ORDER_STATUS_1.default.PENDING, ORDER_STATUS_1.default.CANCELED]),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        logger_1.default.error(errors);
        if (!errors.isEmpty()) {
            (0, response_1.default)(res, {
                statusCode: 400,
                errors: errors.array().map(err => err.msg)
            });
        }
        else {
            next();
        }
    }
];
exports.payBookMiddleware = [
    (0, express_validator_1.param)('id', 'Order id is required').notEmpty(),
    (0, express_validator_1.param)('id', 'Order id is invalid').isUUID(),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        logger_1.default.error(errors);
        if (!errors.isEmpty()) {
            (0, response_1.default)(res, {
                statusCode: 400,
                errors: errors.array().map(err => err.msg)
            });
        }
        else {
            next();
        }
    }
];
