"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
//waiter Schema
var waiterSchema = new mongoose_1.Schema({
    waiter_username: { type: String, required: true },
    waiter_password: { type: String, required: true },
    waiter_days: { type: Array, default: [] }
});
waiterSchema.index({ waiter_username: 1 }, { unique: true });
exports.default = mongoose_1.model("waiters", waiterSchema);
