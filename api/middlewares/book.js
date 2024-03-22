"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTagMiddleware = exports.createBookMiddleware = void 0;
const express_validator_1 = require("express-validator");
const logger_1 = __importDefault(require("../helpers/logger"));
const response_1 = __importDefault(require("../helpers/response"));
exports.createBookMiddleware = [
    (0, express_validator_1.body)('title', 'Title is required').notEmpty(),
    (0, express_validator_1.body)('title', 'Title should be a string').isString(),
    (0, express_validator_1.body)('writer', 'Writer is required').notEmpty(),
    (0, express_validator_1.body)('writer', 'Writer should be a string').isString(),
    (0, express_validator_1.body)('price', 'Price is requirerd').notEmpty(),
    (0, express_validator_1.body)('price', 'Price should be a number').isNumeric(),
    (0, express_validator_1.body)('tagId', 'Tag is required').notEmpty(),
    (0, express_validator_1.body)('tagId', 'Tag is invalid').isUUID(),
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
exports.createTagMiddleware = [
    (0, express_validator_1.body)('name', 'Tag name is required').notEmpty(),
    (0, express_validator_1.body)('name', 'Tag name should be a string').isString(),
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
