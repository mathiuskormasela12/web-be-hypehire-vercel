"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class Router {
    routerApp;
    constructor() {
        this.routerApp = (0, express_1.Router)();
        this.routes();
    }
    get router() {
        return this.routerApp;
    }
}
exports.default = Router;
