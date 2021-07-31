"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const comment_1 = require("../controllers/comment");
const router = express_1.Router();
router.route('/reply').post(auth_1.Auth, comment_1.Reply);
router.route('/replies').post(auth_1.Auth, comment_1.Replies);
router.route('/pin').post(comment_1.Pin);
router.route('/edit').post(auth_1.Auth, comment_1.Edit);
router.route('/delete').post(comment_1.Delete);
exports.default = router;
//# sourceMappingURL=comment.js.map