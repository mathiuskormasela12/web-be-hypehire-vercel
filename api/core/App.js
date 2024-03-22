"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const config_1 = __importDefault(require("../config"));
const AuthRouter_1 = __importDefault(require("../routers/AuthRouter"));
const logger_1 = __importDefault(require("../helpers/logger"));
const BookRouter_1 = __importDefault(require("../routers/BookRouter"));
const OrderRouter_1 = __importDefault(require("../routers/OrderRouter"));
class App {
    app;
    constructor() {
        this.app = (0, express_1.default)();
        // Setup Helmet
        this.app.use((0, helmet_1.default)());
        // Setup Compression
        this.app.use((0, compression_1.default)());
        // Setup Cors
        const corsOptions = {
            origin: (origin, callback) => {
                if (!origin || config_1.default.WEB_CLIENTS.includes(origin)) {
                    callback(null, true);
                }
                else {
                    callback(new Error('Blocked by cors'));
                }
            }
        };
        this.app.use((0, cors_1.default)(corsOptions));
        // Setup Morgan
        this.app.use((0, morgan_1.default)('dev'));
        // Setup Url-Encoded & Json
        this.app.use(express_1.default.urlencoded({ extended: false }));
        this.app.use(express_1.default.json());
        // Setup Static File
        this.app.use('/static', express_1.default.static(path_1.default.join(__dirname, '../../public')));
        const authRouter = new AuthRouter_1.default();
        const bookRouter = new BookRouter_1.default();
        const orderRouter = new OrderRouter_1.default();
        this.app.use('/api/v1/auth', authRouter.router);
        this.app.use('/api/v1/books', bookRouter.router);
        this.app.use('/api/v1/order', orderRouter.router);
    }
    listen() {
        this.app.listen(config_1.default.PORT, () => {
            logger_1.default.info(`The RESTful API is being run at http://localhost:${config_1.default.PORT}`);
        });
    }
}
exports.default = App;
