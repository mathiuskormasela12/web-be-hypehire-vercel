"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_fileupload_1 = __importDefault(require("express-fileupload"));
class RouterWithUploadFile {
    routerApp;
    constructor() {
        this.routerApp = (0, express_1.Router)();
        // Setup File Upload
        this.routerApp.use((0, express_fileupload_1.default)({
            createParentPath: true
        }));
        this.routes();
    }
    get router() {
        return this.routerApp;
    }
}
exports.default = RouterWithUploadFile;
