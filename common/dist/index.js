"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogPostUpdate = exports.BlogPostInput = exports.SigninInput = exports.SignupInput = void 0;
const zod_1 = require("zod");
exports.SignupInput = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(8).max(32),
    name: zod_1.z.string().min(2).max(32),
});
exports.SigninInput = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(8).max(32),
});
exports.BlogPostInput = zod_1.z.object({
    title: zod_1.z.string().min(1).max(255),
    content: zod_1.z.string().min(1).max(10000),
});
exports.BlogPostUpdate = zod_1.z.object({
    title: zod_1.z.string().min(1).max(255),
    content: zod_1.z.string().min(1).max(10000),
    id: zod_1.z.string(),
});
