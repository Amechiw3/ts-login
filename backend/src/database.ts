import mongoose from 'mongoose';
import { keys } from "./keys";

export async function connect() {
    try {
        const isProduction = keys.NODE_ENV === 'production';
        if (!isProduction) {
            await mongoose.connect(keys.MONGODB_URI, {
                useNewUrlParser: true
            });
        } else {
            await mongoose.connect(keys.MONGODB_URI, {
                useNewUrlParser: true
            });
            mongoose.set("debug", true);
        }
        console.log('DB is connected')
    } catch (e) {
        console.log(`Error => ${e}`)
    }
}
