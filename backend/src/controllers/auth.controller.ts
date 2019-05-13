import { Request, Response, NextFunction } from "express";
import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";

import helpersUser from "../libs/helpers.users";
import {keys} from "../keys";
import {UserSchema} from "../models/users.model";
import {Users} from "../interfaces/users.interface";

export class AuthController {
    constructor() {
    }

    /*
    public initialize = () => {
        passport.use("jwt", this.getStrategy());
        return passport.initialize();
    }

    public authenticate = (callback) => {
        passport.authenticate(
            "jwt",
            { session: false, failWithError: true },
            callback
        );
    }

    private getStrategy = (): Strategy => {
        const params = {
            secretOrKey: keys.SECRET,
            jwtFromRequest: ExtractJwt.fromAuthHeader(),
            passReqToCallback: true
        };

        return new Strategy(params, (req, payload: any, done) => {
            UserSchema.findOne({ "username": payload.username }, (err, user) => {

                if (err) {
                    return done(err);
                }
                if (user === null) {
                    return done(null, false, { message: "The user in the token was not found" });
                }

                return done(null, { _id: user._id, username: user.username });
            });
        });
    };*/

    public async index(request: Request, response: Response) : Promise<Response> {
        return response.status(200).json({
            status: 200,
            message: 'Welcome to auth endpoint'
        });
    }

    public async signin(request: Request, response: Response, next: NextFunction) {
        if (!request.body.email) {
            return response.status(422).json({
                status: 422,
                errors: {
                    email: "Cant be blank"
                }
            });
        }
        if (!request.body.password) {
            return response.status(422).json({
                status: 422,
                errors: {
                    email: "Cant be blank"
                }
            });
        }

        const user = await UserSchema.findOne({ "email": request.body.email });
        if (!user) {
            return response.status(500).json({
                status: 500,
                message: "User not found"
            })
        } else {
            const success = helpersUser.validPassword(user.hash, user.salt, request.body.password);
            if (success) {
                return response.status(200).json({
                    status: 200,
                    user: helpersUser.toAuthJSON(user)
                });
            } else {
                return response.status(422).json({
                    status: 422,
                    info: "Email or Password dont correct"
                })
            }
        }
    }

    public async signup(request: Request, response: Response) : Promise<Response> {
        const newUser : Users = new UserSchema;
        newUser.username = request.body.username;
        newUser.email = request.body.email;
        const password = helpersUser.hashPassword(request.body.password);
        newUser.salt = password.salt;
        newUser.hash = password.hash;
        try {
            const user = await newUser.save();
            return response.status(200).json({
                status: 200,
                user: helpersUser.toAuthJSON(user)
            })
        } catch (error) {
            return response.status(500).json({
                status: 500,
                error
            })
        }
    }

    public async view(request: Request, response: Response) : Promise<Response> {
        //@ts-ignore
        const ID = request.payload.id;
        const user = await UserSchema.findById(ID);
        try {
            if (user) {
                return response.status(200).json({
                    status: 200,
                    user: helpersUser.toAuthJSON(user)
                });
            } else {
                return response.status(500).json({
                    status: 500,
                    message: "No valid entry found for provided ID"
                });
            }
        } catch (error) {
            return response.status(500).json({
                status: 500,
                error
            });
        }
    }
}

