"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const response_1 = __importDefault(require("../helpers/response"));
const BookService_1 = __importDefault(require("../services/BookService"));
class BookController {
    static async createBook(req, res) {
        const bookService = new BookService_1.default(req);
        const result = await bookService.createBook();
        (0, response_1.default)(res, result);
    }
    static async createTag(req, res) {
        const bookService = new BookService_1.default(req);
        const result = await bookService.createTag();
        (0, response_1.default)(res, result);
    }
    static async getBooks(req, res) {
        const bookService = new BookService_1.default(req);
        const result = await bookService.getBooks();
        (0, response_1.default)(res, result);
    }
}
exports.default = BookController;
