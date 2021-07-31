"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createAccessToken = (payload) => {
    const { _id } = payload;
    return jsonwebtoken_1.default.sign({ _id }, process.env.ACCESS_SIGNATURE);
};
exports.createAccessToken = createAccessToken;
//# sourceMappingURL=createToken.js.map