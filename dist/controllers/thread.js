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
exports.Pin = exports.Comment = exports.getThread = exports.createThread = exports.Selectors = void 0;
const Comment_1 = require("../models/Comment");
const Thread_1 = __importDefault(require("../models/Thread"));
const User_1 = __importDefault(require("../models/User"));
const generateComment_1 = require("../utils/generateComment");
const getPinnedComment_1 = require("../utils/getPinnedComment");
const Selectors = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const threads = yield Thread_1.default.find().select('_id name').sort({ name: 'asc' });
        const users = yield User_1.default.find().select('-__v').sort({ username: 'asc' });
        return res.status(200).json({
            threads,
            users,
        });
    }
    catch (error) {
        return res.status(500).json({
            error: error.message,
        });
    }
});
exports.Selectors = Selectors;
const createThread = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        if (!name)
            throw new Error('Please enter a thread name.');
        const thread = new Thread_1.default({
            name,
        });
        yield thread.save();
        return res.status(200).json({
            message: `successfully created Thread ${name}!`,
        });
    }
    catch (error) {
        return res.status(500).json({
            error: error.message,
        });
    }
});
exports.createThread = createThread;
const getThread = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id } = req.user;
        const { _thread_name } = req.params;
        let { sort } = req.query;
        let cursor = req.query.cursor;
        const limit = 18;
        const pinned = yield getPinnedComment_1.getPinnedComment(_thread_name, _id);
        const { total, end, comments } = yield Comment_1.Comment.paginate({
            thread: _thread_name,
        }, {
            offset: cursor || 0,
            limit,
            lean: true,
            select: '-__v',
            sort: { date: sort === 'oldest' ? 'asc' : 'desc' },
            populate: {
                path: 'user',
                select: '-__v',
            },
            customLabels: {
                totalDocs: 'total',
                docs: 'comments',
                nextPage: 'end',
            },
        }).then((doc) => __awaiter(void 0, void 0, void 0, function* () {
            const a = [];
            for (let i of doc.comments) {
                delete i.id;
                a.push(yield generateComment_1.generateComment(i, _id));
            }
            doc.comments = a;
            return doc;
        }));
        cursor = cursor + limit || limit;
        return res.status(200).json({
            data: {
                total,
            },
            paging: {
                end: !end,
                cursor,
            },
            pinned: {
                pinned_id: Boolean(pinned) ? pinned._id : '',
                hasPinned: Boolean(pinned),
                useInitialPinned: Boolean(pinned),
                comment: pinned || {},
            },
            comments,
        });
    }
    catch (error) {
        return res.status(500).json({
            error: error.message,
        });
    }
});
exports.getThread = getThread;
const Comment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id } = req.user;
        const { thread, user, body } = req.body;
        if (!user)
            throw new Error();
        const u = yield User_1.default.findById({ _id: user });
        const c = new Comment_1.Comment({
            thread,
            body,
            user: u,
            date: Date.now(),
        });
        yield c.save();
        const comment = yield Comment_1.Comment.findById({ _id: c._id }, '-__v')
            .lean()
            .populate('user', '-__v')
            .then((comment) => __awaiter(void 0, void 0, void 0, function* () {
            return yield generateComment_1.generateComment(comment, _id);
        }));
        return res.status(200).json({
            comment,
        });
    }
    catch (error) {
        return res.status(500).json({
            error: error.message,
        });
    }
});
exports.Comment = Comment;
const Pin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id } = req.user;
        const { _thread_name } = req.params;
        const comment = yield getPinnedComment_1.getPinnedComment(_thread_name, _id);
        return res.status(200).json({
            comment,
        });
    }
    catch (error) {
        return res.status(500).json({
            error: error.message,
        });
    }
});
exports.Pin = Pin;
//# sourceMappingURL=thread.js.map