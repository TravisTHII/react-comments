"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../controllers/user");
const router = express_1.Router();
router.route('/').get(user_1.getUsers);
exports.default = router;
//# sourceMappingURL=user.js.map