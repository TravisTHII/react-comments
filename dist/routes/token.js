"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const token_1 = require("../controllers/token");
const router = express_1.Router();
router.route('').post(token_1.Token);
exports.default = router;
//# sourceMappingURL=token.js.map