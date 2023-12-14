import { Schema, model } from "mongoose";
const companySchema = new Schema({
    name: {
        type: String,
        required: true,
        max: 30,
        min: 5
    },
    email: {
        type: String,
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
    },
    regNo: {
        type: String,
        required: false,
        max: 50,
        min: 2
    }
}, { timestamps: true });

export const Company = model('Company', companySchema)