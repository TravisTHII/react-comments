"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const thread_1 = require("../controllers/thread");
const router = express_1.Router();
router.route('/selectors').get(thread_1.Selectors);
router.route('/:_thread_name').get(auth_1.SoftAccess, thread_1.getThread);
router.route('/comment').post(auth_1.Auth, thread_1.Comment);
router.route('/:_thread_name/pin').post(auth_1.Auth, thread_1.Pin);
if (process.env.ENV === 'development') {
    router.route('/create_thread').post(thread_1.createThread);
}
exports.default = router;
//# sourceMappingURL=thread.js.map