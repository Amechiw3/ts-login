import jwt from "express-jwt";
import { keys } from "../keys";

export const auth = {
    required: jwt({
        secret: keys.SECRET || "ts-login",
        userProperty: "payload",
        getToken: function getTokenFromHeader(request) {
            //@ts-ignore
            if (request.headers.authorization && request.headers.authorization.split(' ')[0] === 'Token') {
                //@ts-ignore
                return request.headers.authorization.split(' ')[1];
            }
            return null;
        }
    }),
    optional: jwt({
        secret: keys.SECRET || "ts-login",
        userProperty: "payload",
        credentialsRequired: false,
        getToken: function getTokenFromHeader(request) {
            //@ts-ignore
            if (request.headers.authorization && request.headers.authorization.split(' ')[0] === 'Token') {
                //@ts-ignore
                return request.headers.authorization.split(' ')[1];
            }
            return null;
        }
    })
};
