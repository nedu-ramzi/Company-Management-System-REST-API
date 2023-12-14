import mongoose, { Schema, model } from "mongoose";
const salesSchema = new Schema({
    purchased: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Purchased'
    }],
    sumTotal: {
        type: Number,
        require: true
    },
}, { timestamps: true });
export const Sales = model('Sales', salesSchema);