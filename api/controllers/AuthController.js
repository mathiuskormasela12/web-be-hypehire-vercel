"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const response_1 = __importDefault(require("../helpers/response"));
const AuthService_1 = __importDefault(require("../services/AuthService"));
class AuthController {
    static async register(req, res) {
        const authService = new AuthService_1.default(req);
        const result = await authService.register();
        (0, response_1.default)(res, result);
    }
    static async login(req, res) {
        const authService = new AuthService_1.default(req);
        const result = await authService.login();
        (0, response_1.default)(res, result);
    }
    static async createToken(req, res) {
        const authService = new AuthService_1.default(req);
        const result = await authService.createToken();
        (0, response_1.default)(res, result);
    }
}
exports.default = AuthController;
