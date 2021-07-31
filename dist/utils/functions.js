"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isOverflowed = exports.Slugify = void 0;
const Slugify = function (s) {
    return s.replace(/[^A-Z0-9]+/gi, '-').toLowerCase();
};
exports.Slugify = Slugify;
const isOverflowed = function (content) {
    let s = content.split(/\r\n|\r|\n/m);
    return s.length > 9 || content.length > 999 ? true : false;
};
exports.isOverflowed = isOverflowed;
//# sourceMappingURL=functions.js.map