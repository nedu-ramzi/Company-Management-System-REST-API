import { Schema, model } from "mongoose";
const userSchema = new Schema({
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
        maxlength: 50,
        minlength: 5
    },
    password: {
        type: String,
        maxlength: 10,
        minlength: 5,
        required: true
    },
    address: {
        type: String,
        required: false,
        maxlength: 50,
        minlength: 5
    },
    phone: {
        type: Array,
        default: [],
    },
    role: {
        type: String,
        enum: ['Admin', 'Staff'],
        default: 'Admin',
    },
    staffId: {
        type: String,
        required: true
    },
    profileImage: {
        type: String,
        required: false,
        maxlength: 50
    }
}, { timestamps: true });

export const User = model('User', userSchema);