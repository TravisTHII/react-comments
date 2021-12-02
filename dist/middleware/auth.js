"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SoftAccess = exports.Auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Auth = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw Error('Not authenticated');
        }
        const token = authHeader.split(' ')[1];
        try {
            const decoded = jsonwebtoken_1.default.verify(token, process.env.ACCESS_SIGNATURE);
            const { _id } = decoded;
            req.user = { _id };
            return next();
        }
        catch (error) {
            throw Error('Invalid Authentication Headers');
        }
    }
    catch (error) {
        return res.status(500).json({
            error: error.message,
        });
    }
};
exports.Auth = Auth;
const SoftAccess = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        req.user = { _id: '' };
        if (authHeader) {
            const token = authHeader.split(' ')[1];
            if (token) {
                const decoded = jsonwebtoken_1.default.verify(token, process.env.ACCESS_SIGNATURE);
                const { _id } = decoded;
                req.user = { _id };
            }
        }
        return next();
    }
    catch (error) {
        return res.status(500).json({
            error: error.message,
        });
    }
};
exports.SoftAccess = SoftAccess;
//# sourceMappingURL=auth.js.map