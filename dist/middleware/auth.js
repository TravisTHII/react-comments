"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Auth = (req, res, next) => {
    try {
        const access = req.header('_token');
        if (!access) {
            req.token = { _id: '' };
        }
        else {
            const verified = jsonwebtoken_1.default.verify(access, process.env.ACCESS_SIGNATURE);
            req.token = verified;
        }
        return next();
    }
    catch (error) {
        return res.status(500).json({
            dev: error.message,
        });
    }
};
exports.Auth = Auth;
//# sourceMappingURL=auth.js.map