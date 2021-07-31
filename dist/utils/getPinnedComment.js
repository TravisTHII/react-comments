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
exports.getPinnedComment = void 0;
const Thread_1 = __importDefault(require("../models/Thread"));
const generateComment_1 = require("./generateComment");
const getPinnedComment = (thread, id) => __awaiter(void 0, void 0, void 0, function* () {
    const { pinned } = yield Thread_1.default.findById({ _id: thread })
        .lean()
        .populate({
        path: 'pinned',
        select: '-__v',
        populate: {
            path: 'user',
            select: '-__v',
        },
    })
        .then((doc) => __awaiter(void 0, void 0, void 0, function* () {
        if (doc.pinned) {
            doc.pinned = yield generateComment_1.generateComment(doc.pinned, id);
        }
        return doc;
    }));
    return pinned;
});
exports.getPinnedComment = getPinnedComment;
//# sourceMappingURL=getPinnedComment.js.map