"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createJwtToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const createJwtToken = (params) => {
    const accessToken = jsonwebtoken_1.default.sign(params, config_1.default.ACCESS_TOKEN.KEY, { expiresIn: config_1.default.ACCESS_TOKEN.EXPIRES_IN });
    const refreshToken = jsonwebtoken_1.default.sign(params, config_1.default.REFRESH_TOKEN.KEY, { expiresIn: config_1.default.REFRESH_TOKEN.EXPIRES_IN });
    return {
        accessToken,
        refreshToken
    };
};
exports.createJwtToken = createJwtToken;
