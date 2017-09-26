import { Schema, model } from "mongoose";

 //waiter Schema
const waiterSchema = new Schema({
        waiter_username: {type: String, required: true},
        waiter_password: {type: String,required: true},
        waiter_days: {type: Array, default: []}
    });



waiterSchema.index({waiter_username: 1}, {unique: true});

export default model("waiters", waiterSchema);
