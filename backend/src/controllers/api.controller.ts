import { Request, Response, NextFunction } from "express";

export class ApiController {
    constructor() {

    }

    index(request: Request, response: Response) : Response {
        return response.json('Welcome to my API')
    }
}
