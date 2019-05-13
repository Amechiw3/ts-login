import mongoose from 'mongoose';
import { keys } from "./keys";

class Mongo {
    constructor() {
        this.mongo();
    }

    private mongo() {
        const connection = mongoose.connection;
        connection.on("connected", function() {
           console.log("Mongo Connection Established");
        });
        connection.on("reconnected", function() {
            console.log("Mongo Connection Reestablished");
        });
        connection.on("disconnected", function() {
            console.log("Mongo Connection Disconnected");
            console.log("Trying to reconnect to Mongo...");
            setTimeout(() => {
               mongoose.connect(keys.MONGODB_URI, {
                   autoReconnect: true,
                   keepAlive: true,
                   socketTimeoutMS: 3000,
                   connectTimeoutMS: 3000,
                   useNewUrlParser: true
               });
            });
        });
        connection.on("close", function () {
            console.log("Mongo Connection Closed");
        });
        connection.on("error", function (error: Error) {
            console.log("Mongo Connection Error: " + error)
        });
    }

    public async run() {
        try {
            const isProduction = keys.NODE_ENV === 'production';
            if (!isProduction) {
                await mongoose.connect(keys.MONGODB_URI, {
                    autoReconnect:true,
                    keepAlive: true,
                    useNewUrlParser: true
                });
            } else {
                await mongoose.connect(keys.MONGODB_URI, {
                    autoReconnect:true,
                    keepAlive: true,
                    useNewUrlParser: true
                });
                mongoose.set("debug", true);
            }
            console.log('DB is connected')
        } catch (e) {
            console.log(`Error => ${e}`)
        }
    }
}

export default new Mongo();
