"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        trim: true,
        required: true,
    },
    slug: String,
    motto: String,
    badge: {
        title: String,
        backgroundColor: String,
        textColor: String,
    },
    image: {
        avatar: String,
    },
});
exports.default = mongoose_1.default.model('User', UserSchema);
//# sourceMappingURL=User.js.map