import express, { Application, Request, Response, NextFunction, json } from 'express';
import cors from "cors";
import morgan from 'morgan';
import methodOverride from "method-override";
import errorHandler from "errorhandler";

import { keys } from './keys';
import { connect } from "./database";

//Routes
import ApiRoutes from './routes/api.routes';

export class App {
    private app : Application;
    private isProduction : boolean;

    constructor(private port?: number | string) {
        this.app = express();
        this.isProduction = keys.NODE_ENV === 'production';
        this.settings();
        this.middlewares();
        this.routes();
    }

    async database() : Promise<void> {
        await connect();
    }

    private settings() {
        this.app.set('port', this.port || keys.PORT);
    }

    private middlewares() {
        this.app.use(cors());
        this.app.use(methodOverride());
        this.app.use(morgan("dev"));
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(json());

        if (!this.isProduction) {
            this.app.use(errorHandler());
        }

        this.app.use(function(req: Request, res: Response, next: NextFunction) {
            var err = new Error('Not Found');
            //@ts-ignore
            err.status = 404;
            next(err);
        });
        if (!this.isProduction) {
            // development error handler
            // will print stacktrace
            this.app.use(function(err: { stack: any; status: any; message: any; }, req: Request, res: Response, next: NextFunction){
                console.log(err.stack);

                res.status(err.status || 500).json({
                    status: err.status || 500,
                    errors: {
                        message: err.message,
                        error: err
                    }
                });
            });
        }
        else {
            // production error handler
            // no stacktraces leaked to user
            this.app.use(function (err: { status: any; message: any; }, req: Request, res: Response, next: NextFunction) {
                res.status(err.status || 500);
                res.json({
                    'errors': {
                        message: err.message,
                        error: {}
                    }
                });
            });
        }
    }

    private routes() {
        this.app.use('/api', ApiRoutes)
    }

    async listen() : Promise<void> {
        await this.app.listen(this.app.get('port'));
        console.log(`Server on port: ${this.app.get('port')}`)
    }
}
