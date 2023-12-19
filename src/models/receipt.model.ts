import mongoose, { Schema, model } from "mongoose";
const receiptSchema = new Schema({
    sales: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sales'
    },
    receiptNumber:{
        type: String,
        required: true,
        maxlength: 7
    },
    salesId:{
        type: String,
    }
}, { timestamps: true });
export const Receipt = model('Receipt', receiptSchema);