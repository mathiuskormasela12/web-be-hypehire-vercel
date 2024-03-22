"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTokenMiddleware = exports.isLoginMiddleware = exports.loginAccountMiddleware = exports.registerAccountMiddleware = void 0;
const express_validator_1 = require("express-validator");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const logger_1 = __importDefault(require("../helpers/logger"));
const response_1 = __importDefault(require("../helpers/response"));
const config_1 = __importDefault(require("../config"));
exports.registerAccountMiddleware = [
    (0, express_validator_1.body)('email', 'Email is required').notEmpty(),
    (0, express_validator_1.body)('email', 'Email is invalid').isEmail(),
    (0, express_validator_1.body)('password', 'Password is required').notEmpty(),
    (0, express_validator_1.body)('password', 'Password is too weak').isStrongPassword(),
    (0, express_validator_1.body)('repeatPassword', 'Repeat password is required').notEmpty(),
    (0, express_validator_1.body)('repeatPassword', 'Password does not match').custom((value, { req }) => value === req.body.password),
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
exports.loginAccountMiddleware = [
    (0, express_validator_1.body)('email', 'Email is required').notEmpty(),
    (0, express_validator_1.body)('email', 'Email is invalid').isEmail(),
    (0, express_validator_1.body)('password', 'Password is required').notEmpty(),
    (0, express_validator_1.body)('password', 'Password is too weak').isStrongPassword(),
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
const isLoginMiddleware = (req, res, next) => {
    const accessToken = req.headers['x-access-token'];
    if (typeof accessToken === 'string') {
        try {
            const result = jsonwebtoken_1.default.verify(accessToken, config_1.default.ACCESS_TOKEN.KEY);
            req.app.locals.decoded = result;
            next();
        }
        catch (err) {
            const { message } = err;
            (0, response_1.default)(res, {
                statusCode: 403,
                errors: [message]
            });
        }
    }
    else {
        (0, response_1.default)(res, {
            statusCode: 400,
            errors: ['Forbidden']
        });
    }
};
exports.isLoginMiddleware = isLoginMiddleware;
exports.createTokenMiddleware = [
    (0, express_validator_1.body)('refreshToken', 'Email is required').notEmpty(),
    (0, express_validator_1.body)('refreshToken', 'Refresh token is invalid').isJWT(),
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
