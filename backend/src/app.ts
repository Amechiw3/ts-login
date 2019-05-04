import express, { Application }from 'express';
import { keys } from './keys';
import morgan from 'morgan';

//Routes
import ApiRoutes from './routes/api.routes';

export class App {
    private app : Application;

    constructor(private port?: number | string) {
        this.app = express();
        this.settings();
        this.middlewares();
        this.routes();
    }

    settings() {
        this.app.set('port', this.port || keys.PORT);

    }

    middlewares() {
        this.app.use(morgan("dev"));
    }

    routes() {
        this.app.use('/api', ApiRoutes)
    }

    async listen() {
        await this.app.listen(this.app.get('port'));
        console.log(`Server on port: ${this.app.get('port')}`)
    }
}
