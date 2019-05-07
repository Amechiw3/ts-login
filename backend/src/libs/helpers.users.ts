import crypto from "crypto";
import jwt from "jsonwebtoken";

import { keys } from "../keys";

class HelpersUsers {
    constructor() {

    }

    public toProfileJSON(data : any) {
        return {
            _id: data._id,
            username: data.username,
            email: data.email,
            bio: data.bio,
            image: data.image || 'https://dummyimage.com/300/09f/fff.png'
        };
    }

    public toAuthJSON(data: any) {
        return {
            username: data.username,
            email: data.email,
            token: this.generateJWT(data),
            bio: data.bio,
            imagen: data.image
        }
    }

    private generateJWT(data: any) {
        const today = new Date();
        const exp = new Date(today);
        const secret = keys.SECRET || "ts-login";
        const user = data;
        exp.setDate(today.getDate() + 60);

        return jwt.sign({
            id: user._id,
            username: user.username,
            exp: parseInt(String(exp.getTime() / 1000))
        }, secret);
    }

    public hashPassword(password: string) {
        var salt = crypto.randomBytes(16).toString('hex');
        var iterations = 10000;
        var hash = crypto.pbkdf2Sync(password, salt, iterations, 512, 'sha512').toString('hex');

        return {
            salt: salt,
            hash: hash,
            iterations: iterations
        }
    }

    public validPassword(savedHash: string, savedSalt: crypto.BinaryLike, passwordAttempt: string) {
        var hash =  crypto.pbkdf2Sync(passwordAttempt, savedSalt, 10000, 512, 'sha512').toString('hex');
        return savedHash === hash;
    }
}
export default new HelpersUsers();
