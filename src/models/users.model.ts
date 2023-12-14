import { Schema, model } from "mongoose";
const userSchema = new Schema({
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
        max: 50,
        min: 5
    },
    password:{
        type: String,
        max: 10,
        min:5,
        required: true
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
    },
    role: {
        type: String,
        enum: ['Admin', 'Staff'],
        default: 'Admin',
    },
    staffId:{
        type: String,
        required: true
    },
    profileImage:{
        type:String,
        required: false,
        max:50
    }
}, { timestamps: true });

export const User = model('User', userSchema);