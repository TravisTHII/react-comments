"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestToken = exports.Token = void 0;
const User_1 = __importDefault(require("../models/User"));
const createToken_1 = require("../utils/createToken");
const Token = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user } = req.body;
        const token = createToken_1.createAccessToken(user);
        return res.status(200).json({
            token,
        });
    }
    catch (error) {
        return res.status(500).json({
            error: error.message,
        });
    }
});
exports.Token = Token;
const TestToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id } = req.user;
        const user = yield User_1.default.findById({ _id });
        return res.status(200).json({
            user,
        });
    }
    catch (error) {
        return res.status(500).json({
            error: error.message,
        });
    }
});
exports.TestToken = TestToken;
//# sourceMappingURL=token.js.map