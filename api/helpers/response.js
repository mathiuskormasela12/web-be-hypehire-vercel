"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const response = (res, params) => {
    return res.status(params.statusCode).json(params);
};
exports.default = response;
