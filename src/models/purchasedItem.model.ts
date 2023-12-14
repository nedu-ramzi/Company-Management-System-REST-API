import mongoose, { Schema, model } from "mongoose";
const purchasedItemSchema = new Schema({
    purchasedItem: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Inventory'
    }],
    totalPrice: {
        type: Number,
        required: true
    },
    attendant: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    customer: {
        type: mongoose.Schema.ObjectId,
        ref: 'Customer',
        required: true
    },
    purchasedQuantity: {
        type: Number,
        default: 0
    },
}, { timestamps: true });
export const Purchased = model('Purchased', purchasedItemSchema);