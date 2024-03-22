"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const Service_1 = __importDefault(require("../core/Service"));
const uploadFile_1 = __importDefault(require("../helpers/uploadFile"));
const config_1 = __importDefault(require("../config"));
class BookService extends Service_1.default {
    async createBook() {
        const photo = await (0, uploadFile_1.default)(/png|jpg|jpeg/gi, this.files, 'photo');
        if (typeof photo === 'string') {
            try {
                const [books, tags] = await Promise.all([
                    this.prisma.book.findMany({
                        where: {
                            title: String(this.body.title).toLowerCase()
                        }
                    }),
                    this.prisma.tag.findMany({
                        where: {
                            id: this.body.tagId
                        }
                    })
                ]);
                if (books.length === 0 && tags.length > 0) {
                    const result = await this.prisma.book.create({
                        data: {
                            title: String(this.body.title).toLowerCase(),
                            writer: this.body.writer,
                            price: Number(this.body.price),
                            image: photo
                        }
                    });
                    await this.prisma.bookTag.create({
                        data: {
                            bookId: result.id,
                            tagId: this.body.tagId
                        }
                    });
                    return {
                        statusCode: 201,
                        message: 'Book created successfully'
                    };
                }
                else if (tags.length === 0) {
                    try {
                        await promises_1.default.unlink(path_1.default.join(__dirname, '../../public/' + photo));
                        return {
                            statusCode: 400,
                            message: 'Tag is unknown'
                        };
                    }
                    catch (err) {
                        const { message } = err;
                        return {
                            statusCode: 500,
                            errors: [message]
                        };
                    }
                }
                else {
                    try {
                        await promises_1.default.unlink(path_1.default.join(__dirname, '../../public/' + photo));
                        return {
                            statusCode: 400,
                            message: 'Book already exists'
                        };
                    }
                    catch (err) {
                        const { message } = err;
                        return {
                            statusCode: 500,
                            errors: [message]
                        };
                    }
                }
            }
            catch (err) {
                const { message } = err;
                try {
                    await promises_1.default.unlink(path_1.default.join(__dirname, '../../public/' + photo));
                    return {
                        statusCode: 400,
                        message
                    };
                }
                catch (err) {
                    const { message } = err;
                    return {
                        statusCode: 500,
                        errors: [message]
                    };
                }
            }
        }
        else {
            return photo;
        }
    }
    async createTag() {
        try {
            const tags = await this.prisma.tag.findMany({
                where: {
                    name: this.body?.name?.toLowerCase()
                }
            });
            if (tags.length === 0) {
                await this.prisma.tag.create({
                    data: {
                        name: this.body?.name?.toLowerCase()
                    }
                });
                return {
                    statusCode: 201,
                    message: 'Tag created successfully'
                };
            }
            else {
                return {
                    statusCode: 400,
                    message: 'Tag already exists'
                };
            }
        }
        catch (err) {
            const { message } = err;
            return {
                statusCode: 500,
                errors: [message]
            };
        }
    }
    async getBooks() {
        try {
            const books = await this.prisma.book.findMany({
                where: {
                    title: {
                        contains: this.query.keyword
                    }
                },
                include: {
                    bookTag: {
                        include: {
                            tag: true
                        }
                    }
                }
            });
            return {
                statusCode: 200,
                data: books.map(item => ({
                    ...item,
                    image: `${config_1.default.APP_URL}/static/${item.image}`
                }))
            };
        }
        catch (err) {
            const { message } = err;
            return {
                statusCode: 500,
                errors: [message]
            };
        }
    }
}
exports.default = BookService;
