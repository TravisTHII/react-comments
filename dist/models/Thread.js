"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ThreadSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    pinned: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Comment',
        default: null,
    },
});
exports.default = mongoose_1.default.model('Thread', ThreadSchema);
//# sourceMappingURL=Thread.js.map