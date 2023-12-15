import mongoose, { Schema, model } from "mongoose";
const salesItemSchema = new Schema({
    inventory: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Inventory'
    }],
    totalPrice: {
        type: Number,
        required: true
    },
    attendant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    purchasedQuantity: {
        type: Number,
        default: 0
    },
}, { timestamps: true });
export const Sales = model('Sales', salesItemSchema);