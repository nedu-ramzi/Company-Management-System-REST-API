import { Schema, model } from "mongoose";
const inventorySchema = new Schema({
    productName: {
        type: String,
        require: true
    },
    quantity: {
        type: Number,
        require: true
    },
    price: {
        type: Number,
        default: 0,
        require: true
    },
    description: {
        type: String,
        require: false,
        max: 100
    }
}, { timestamps: true });

export const Inventory = model('Inventory', inventorySchema)