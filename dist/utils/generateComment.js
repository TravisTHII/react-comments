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
exports.generateComment = void 0;
const date_fns_1 = require("date-fns");
const unique_string_1 = __importDefault(require("unique-string"));
const User_1 = __importDefault(require("../models/User"));
const Thread_1 = __importDefault(require("../models/Thread"));
const Comment_1 = require("../models/Comment");
const generateComment = (comment, _id) => __awaiter(void 0, void 0, void 0, function* () {
    const total = yield Comment_1.Comment.find({
        'reply.to': comment._id,
    }).countDocuments();
    const pinned = yield Thread_1.default.findOne().where('pinned').equals(comment._id);
    const { data: { edited }, } = yield Comment_1.Comment.findById({ _id: comment._id }).select('data');
    const isPinned = Boolean(pinned);
    return Object.assign(Object.assign({}, comment), { reply: Object.assign(Object.assign({}, comment.reply), { total, hasReplies: total ? true : false }), date: {
            published: date_fns_1.formatDistance(comment.date, Date.now(), { addSuffix: true }),
            posted: date_fns_1.format(comment.date, 'MMMM do, y | h:mm a'),
        }, menu: _id ? yield generateMenu(comment, _id, isPinned) : null, data: {
            pinned: isPinned,
            edited,
            overflow: isOverflowed(comment.body),
        }, react: {
            key: unique_string_1.default(),
        } });
});
exports.generateComment = generateComment;
const isOverflowed = (content) => {
    let s = content.split(/\r\n|\r|\n/m);
    return s.length > 9 || content.length > 999 ? true : false;
};
const generateMenu = (comment, _id, pinned) => __awaiter(void 0, void 0, void 0, function* () {
    let menu;
    const { admin } = yield User_1.default.findById({ _id }).select('-_id admin').lean();
    const myComment = String(comment.user._id) === _id;
    const isPinned = pinned ? 'Unpin' : 'Pin';
    if (admin) {
        if (myComment) {
            menu = [isPinned, 'Edit', 'Delete'];
        }
        else {
            menu = [isPinned, 'Delete', 'Report'];
        }
    }
    else {
        if (myComment) {
            menu = ['Edit', 'Delete'];
        }
        else {
            menu = ['Report'];
        }
    }
    return menu;
});
//# sourceMappingURL=generateComment.js.map