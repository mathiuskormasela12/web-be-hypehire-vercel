"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RouterWithUploadFile_1 = __importDefault(require("../core/RouterWithUploadFile"));
const BookController_1 = __importDefault(require("../controllers/BookController"));
const auth_1 = require("../middlewares/auth");
const book_1 = require("../middlewares/book");
class BookRouter extends RouterWithUploadFile_1.default {
    routes() {
        this.router.post('/', auth_1.isLoginMiddleware, book_1.createBookMiddleware, BookController_1.default.createBook);
        this.router.get('/', auth_1.isLoginMiddleware, BookController_1.default.getBooks);
        this.router.post('/tag', auth_1.isLoginMiddleware, book_1.createTagMiddleware, BookController_1.default.createTag);
    }
}
exports.default = BookRouter;
