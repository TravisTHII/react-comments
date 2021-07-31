"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
const CommentSchema = new mongoose_1.default.Schema({
    thread: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Thread',
    },
    body: String,
    date: Date,
    reply: {
        to: {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'Comment',
        },
    },
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
    },
    data: {
        edited: {
            type: Boolean,
            default: false,
        },
    },
});
CommentSchema.plugin(mongoose_paginate_v2_1.default);
exports.Comment = mongoose_1.default.model('Comment', CommentSchema);
//# sourceMappingURL=Comment.js.map