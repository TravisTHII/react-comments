"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const token_1 = require("../controllers/token");
const router = express_1.Router();
router.route('').post(token_1.Token);
if (process.env.ENV === 'development') {
    router.route('/test_token').get(auth_1.Auth, token_1.TestToken);
}
exports.default = router;
//# sourceMappingURL=token.js.map