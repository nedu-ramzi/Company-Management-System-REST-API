import { Schema, model } from "mongoose";
const customerSchema = new Schema({
    name: {
        type: String,
        required: true,
        maxlength: 30,
        minlength: 5
    },
    email: {
        type: String,
        unique: true,
        required: false,
        maxlength: 30,
        minlength: 5
    },
    address: {
        type: String,
        required: false,
        maxlength: 30,
        minlength: 5
    },
    phone: {
        type: Array,
        default: [],
        required: true,
        maxlength: 11
    }
}, { timestamps: true });

export const Customer = model('Customer', customerSchema)