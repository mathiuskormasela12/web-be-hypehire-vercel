"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Service_1 = __importDefault(require("../core/Service"));
const token_1 = require("../helpers/token");
const config_1 = __importDefault(require("../config"));
class AuthService extends Service_1.default {
    async register() {
        try {
            const users = await this.prisma.user.findMany({
                where: {
                    email: this.body.email
                }
            });
            if (users.length === 0) {
                await this.prisma.user.create({
                    data: {
                        email: this.body.email,
                        password: bcryptjs_1.default.hashSync(this.body.password, 8),
                        point: 100
                    }
                });
                return {
                    statusCode: 201,
                    message: 'Register successfully'
                };
            }
            else {
                return {
                    statusCode: 400,
                    message: 'Register failed',
                    errors: ['user already exist']
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
    async login() {
        try {
            const users = await this.prisma.user.findMany({
                where: {
                    email: this.body.email
                }
            });
            if (users.length > 0 && bcryptjs_1.default.compareSync(this.body.password, users[0].password)) {
                const { accessToken, refreshToken } = (0, token_1.createJwtToken)({ code: users[0].id });
                return {
                    statusCode: 200,
                    data: {
                        accessToken,
                        refreshToken
                    }
                };
            }
            else {
                return {
                    statusCode: 400,
                    errors: ['user does not exist']
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
    async createToken() {
        const refreshToken = this.body.refreshToken;
        try {
            const result = jsonwebtoken_1.default.verify(refreshToken, config_1.default.REFRESH_TOKEN.KEY);
            if (typeof result === 'object') {
                const { accessToken, refreshToken: newRefreshToken } = (0, token_1.createJwtToken)({ code: result.code });
                return {
                    statusCode: 200,
                    data: {
                        accessToken,
                        refreshToken: newRefreshToken
                    }
                };
            }
            else {
                return {
                    statusCode: 400,
                    errors: ['Failed to create token']
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
}
exports.default = AuthService;
