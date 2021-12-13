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
exports.Delete = exports.Edit = exports.Pin = exports.Replies = exports.Reply = void 0;
const User_1 = __importDefault(require("../models/User"));
const Thread_1 = __importDefault(require("../models/Thread"));
const Comment_1 = require("../models/Comment");
const generateComment_1 = require("../utils/generateComment");
const Reply = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { user: { _id }, body: { comment, body, user }, } = req;
        const u = yield User_1.default.findById({ _id: user });
        const c = yield Comment_1.Comment.findById({ _id: comment });
        if (c) {
            const r = new Comment_1.Comment({
                body,
                reply: {
                    total: 0,
                    hasReplies: false,
                    to: c,
                },
                user: u,
                date: Date.now(),
            });
            yield r.save();
            const reply = yield Comment_1.Comment.findById({ _id: r._id }, '-__v')
                .lean()
                .populate('user', '-__v')
                .then((comment) => __awaiter(void 0, void 0, void 0, function* () {
                return yield generateComment_1.generateComment(comment, _id);
            }));
            return res.status(200).json({
                comment: reply,
            });
        }
        else {
            return res.status(500).json({
                error: 'Comment does not exist',
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            error: error.message,
        });
    }
});
exports.Reply = Reply;
const Replies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { user: { _id }, body: { comment }, query: { cursor }, } = req;
        const newCursor = Number(cursor) || 0;
        const limit = 9;
        const { end, replies } = yield Comment_1.Comment.paginate({
            'reply.to': comment,
        }, {
            offset: newCursor,
            limit,
            lean: true,
            select: '-__v',
            sort: { date: 'desc' },
            populate: {
                path: 'user',
                select: '-__v',
            },
            customLabels: {
                docs: 'replies',
                nextPage: 'end',
            },
        }).then((doc) => __awaiter(void 0, void 0, void 0, function* () {
            const a = [];
            for (const i of doc.replies) {
                delete i.id;
                a.push(yield generateComment_1.generateComment(i, _id));
            }
            doc.replies = a;
            return doc;
        }));
        return res.status(200).json({
            paging: {
                end: !end,
                cursor: newCursor + limit || limit,
            },
            replies,
        });
    }
    catch (error) {
        return res.status(500).json({
            error: error.message,
        });
    }
});
exports.Replies = Replies;
const Pin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { thread, comment } = req.body;
        const { pinned } = yield Thread_1.default.findOne({ _id: thread }).select('pinned');
        yield Thread_1.default.findByIdAndUpdate({ _id: thread }, { pinned: String(pinned) === comment ? null : comment });
        return res.status(200).json({
            message: `Comment successfully ${pinned ? 'Unpinned' : 'Pinned'}.`,
        });
    }
    catch (error) {
        return res.status(500).json({
            error: error.message,
        });
    }
});
exports.Pin = Pin;
const Edit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { user: { _id }, body: { comment, body }, } = req;
        yield Comment_1.Comment.findByIdAndUpdate({ _id: comment }, {
            body,
            data: {
                edited: true,
            },
        });
        const editedComment = yield Comment_1.Comment.findById({ _id: comment }, '-__v')
            .lean()
            .populate({
            path: 'user',
            select: '-__v',
        })
            .then((doc) => __awaiter(void 0, void 0, void 0, function* () {
            return yield generateComment_1.generateComment(doc, _id);
        }));
        return res.status(200).json({
            message: 'Comment was updated successfully.',
            comment: editedComment,
        });
    }
    catch (error) {
        return res.status(500).json({
            error: error.message,
        });
    }
});
exports.Edit = Edit;
const Delete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { comment } = req.body;
        const pinned = yield Thread_1.default.findOne().where('pinned').equals(comment);
        if (Boolean(pinned)) {
            yield Thread_1.default.findByIdAndUpdate({ _id: pinned._id }, { pinned: null });
        }
        const deleteComment = yield Comment_1.Comment.findByIdAndDelete({
            _id: comment,
        });
        let message = deleteComment
            ? 'Comment deleted successfully.'
            : 'Comment could not be deleted.';
        return res.status(200).json({
            message,
        });
    }
    catch (error) {
        return res.status(500).json({
            error: error.message,
        });
    }
});
exports.Delete = Delete;
//# sourceMappingURL=comment.js.map