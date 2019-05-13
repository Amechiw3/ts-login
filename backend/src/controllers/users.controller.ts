import { Request, Response, NextFunction } from "express";
import {UserSchema} from "../models/users.model";
import helpersUser from "../libs/helpers.users";
import {Users} from "../interfaces/users.interface";

export class UsersController {
    constructor() {

    }

    public async index(request: Request, response: Response) : Promise<Response> {
        const users = await UserSchema.find({});
        try {
            return response.status(200).json({
                status: 200,
                message: 'Users retrieved success!!',
                count: users.length,
                users: users.map(user => {
                    return helpersUser.toProfileJSON(user)
                })
            });
        } catch (e) {
            return response.status(500).json({
                status: 500,
                error: e
            })
        }
    }

    public async add(request: Request, response: Response) : Promise<Response> {
        const newUser : Users = new UserSchema;
        newUser.username = request.body.username;
        newUser.email = request.body.email;
        const password = helpersUser.hashPassword(request.body.password);
        newUser.salt = password.salt;
        newUser.hash = password.hash;

        try {
            const user = await newUser.save();
            return response.status(201).json({
                status: 201,
                message: "Created user success",
                user: helpersUser.toAuthJSON(user)
            });
        } catch (error) {
            return response.status(500).json({
                status: 500,
                error
            })
        }
    }

    public async get(request: Request, response: Response) : Promise<Response> {
        const user = await UserSchema.findById(request.params.ID);
        if (user) {
            return response.status(200).json({
                status: 200,
                user: helpersUser.toAuthJSON(user)
            })
        } else {
            return response.status(500).json({
                status: 500,
                message: "No valid entry found for provide ID"
            });
        }
    }

    public async update(request: Request, response: Response) : Promise<Response> {
        const user = await UserSchema.findById(request.params.ID);
        if (user) {
            if(typeof request.body.username !== 'undefined') { user.username = request.body.username; }
            if(typeof request.body.email !== 'undefined') { user.email = request.body.email; }
            if(typeof request.body.image !== 'undefined') { user.image = request.body.image; }
            if(typeof request.body.password !== 'undefined') {
                let password = helpersUser.hashPassword(request.body.password);
                user.salt = password.salt;
                user.hash = password.hash;
            }
            try {
                const userUpdate = await user.save();
                return response.status(200).json({
                    status: 200,
                    message: "User updated",
                    user: helpersUser.toAuthJSON(userUpdate)
                })
            } catch (error) {
                return response.status(500).json({
                    status: 500,
                    error
                })
            }

        } else {
            return response.status(500).json({
                status: 500,
                message: "No valid entry found for provide ID"
            });
        }
    }

    public async delete(request: Request, response: Response) : Promise<Response> {
        const user = await UserSchema.findById(request.params.ID);
        if (user) {
            try {
                const userDelete = await user.remove();
                return response.status(200).json({
                    status: 200,
                    message: "User deleted",
                })
            } catch (error) {
                return response.status(500).json({
                    status: 500,
                    error
                })
            }

        } else {
            return response.status(500).json({
                status: 500,
                message: "No valid entry found for provide ID"
            });
        }
    }
}

