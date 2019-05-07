import * as mongoose from "mongoose"
import unique from "mongoose-unique-validator";

import { Users } from "../interfaces/users.interface";

const schema = new mongoose.Schema({
    username: {
        type: String,
        lowercase: true,
        required: [true, "Cant be blank"],
        match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
        unique: true,
        index: true,
    },
    email: {
        type: String,
        lowercase: true,
        required: [true, "Cant be blank"],
        match: [/\S+@\S+\.\S+/, 'is invalid'],
        unique: true,
        index: true,
    },
    image: { type: String },
    bio: { type: String },
    hash: { type: String },
    salt: { type: String }
}, { timestamps: true });
schema.plugin(unique, { message: "is already taken" });

export const UserSchema = mongoose.model<Users>('user', schema, 'users', true);
