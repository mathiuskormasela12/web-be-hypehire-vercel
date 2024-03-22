"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const uploadFile = async (allowedTypes, files, fieldName) => {
    if (files?.[fieldName]) {
        const file = files[fieldName];
        const extension = file.name.split('.').pop() ?? '';
        const checkMimeType = allowedTypes.test(file.mimetype);
        const checkExt = allowedTypes.test(extension);
        if (!checkExt && !checkMimeType) {
            return {
                statusCode: 400,
                errors: [`${extension} file is not alowed`]
            };
        }
        if (file.size > 3000000) {
            return {
                statusCode: 400,
                errors: ['Your file is too larger']
            };
        }
        let result = '';
        result += Date.now().toString();
        result += '.';
        result += extension;
        try {
            await file.mv(path_1.default.join(__dirname, '../../public/' + result));
            return result;
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
        return {
            statusCode: 400,
            errors: [`${fieldName} is required`]
        };
    }
};
exports.default = uploadFile;
