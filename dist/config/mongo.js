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
exports.mongoDb = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const safe_1 = __importDefault(require("colors/safe"));
const mongoDb = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const conn = yield mongoose_1.default.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        });
        console.log(safe_1.default.cyan(safe_1.default.bold(safe_1.default.underline(`MongoDB Connected: ${conn.connection.host}`))));
    }
    catch (error) {
        console.log(safe_1.default.red(`Error: ${error.message}`));
        process.exit(1);
    }
});
exports.mongoDb = mongoDb;
//# sourceMappingURL=mongo.js.map