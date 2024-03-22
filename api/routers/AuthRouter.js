"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Router_1 = __importDefault(require("../core/Router"));
const AuthController_1 = __importDefault(require("../controllers/AuthController"));
const auth_1 = require("../middlewares/auth");
class AuthRouter extends Router_1.default {
    routes() {
        this.router.post('/register', auth_1.registerAccountMiddleware, AuthController_1.default.register);
        this.router.post('/login', auth_1.loginAccountMiddleware, AuthController_1.default.login);
        this.router.post('/token', auth_1.createTokenMiddleware, AuthController_1.default.createToken);
    }
}
exports.default = AuthRouter;
