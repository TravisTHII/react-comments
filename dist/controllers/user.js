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
exports.createUser = exports.getUsers = void 0;
const User_1 = __importDefault(require("../models/User"));
const functions_1 = require("../utils/functions");
const getUsers = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.default.find().select('-__v');
        return res.status(200).json({
            users,
        });
    }
    catch (error) {
        return res.status(500).json({
            error: error.message,
        });
    }
});
exports.getUsers = getUsers;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, motto, badge, image } = req.body;
        if (!username)
            throw new Error('Please enter a username.');
        const newUser = new User_1.default({
            username,
            slug: functions_1.Slugify(username),
            motto,
            badge: Object.assign({}, badge),
            image: Object.assign({}, image),
        });
        const user = yield newUser.save();
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
exports.createUser = createUser;
//# sourceMappingURL=user.js.map