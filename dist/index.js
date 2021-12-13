"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const safe_1 = __importDefault(require("colors/safe"));
const helmet_1 = __importDefault(require("helmet"));
const mongo_1 = require("./config/mongo");
const routes_1 = require("./routes");
mongo_1.mongoDb();
const app = express_1.default();
app.set('trust proxy', 1);
app.use(express_1.default.json());
app.use(helmet_1.default());
app.use(cors_1.default());
app.use('/api/v1/user', routes_1.user);
app.use('/api/v1/thread', routes_1.thread);
app.use('/api/v1/comment', routes_1.comment);
app.use('/api/v1/token', routes_1.token);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(safe_1.default.yellow(`Running server on port ${PORT} in ${process.env.ENV} mode`)));
//# sourceMappingURL=index.js.map