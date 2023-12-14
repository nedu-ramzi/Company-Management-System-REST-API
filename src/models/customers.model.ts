import { Schema, model } from "mongoose";
const customerSchema = new Schema({
    name: {
        type: String,
        required: true,
        max: 30,
        min: 5
    },
    email: {
        type: String,
        unique: true,
        required: false,
        max: 30,
        min: 5
    },
    address: {
        type: String,
        required: false,
        max: 30,
        min: 5
    },
    phone: {
        type: Array,
        default: [],
        required: true,
    }
}, { timestamps: true });

export const Customer = model('Customer', customerSchema)