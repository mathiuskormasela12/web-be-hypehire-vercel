"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
class Service {
    body;
    params;
    query;
    headers;
    locals;
    files;
    prisma;
    constructor(req) {
        this.body = req.body;
        this.params = req.params;
        this.query = req.query;
        this.headers = req.headers;
        this.locals = req?.app?.locals;
        this.files = req.files;
        this.prisma = new client_1.PrismaClient();
    }
}
exports.default = Service;
