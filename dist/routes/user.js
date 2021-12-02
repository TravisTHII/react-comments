"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../controllers/user");
const router = express_1.Router();
router.route('/').get(user_1.getUsers);
if (process.env.ENV === 'development') {
    router.route('/create_user').post(user_1.createUser);
}
exports.default = router;
//# sourceMappingURL=user.js.map