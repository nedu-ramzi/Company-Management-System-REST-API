import mongoose, { Schema, model } from "mongoose";
const salesItemSchema = new Schema({
    company:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true  
    },
    inventory: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Inventory',
        required: true
    }],
    purchasedQuantity: {
        type: Number,
        default: 0
    },
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
    vat: {
        type: Number,
        default: 0.0
    },
    discount: {
        type: Number,
        default: 0
    },
    tenderedAmount: {
        type: Number,
        default: 0
    },
    change: {
        type: Number,
        default: 0
    },
    payType: {
        type: String,
        enum: ['Cash', 'Transfer', 'POS'],
        default: 'Cash',
    }
}, { timestamps: true });
export const Sales = model('Sales', salesItemSchema);