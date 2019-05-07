import { Router } from 'express';

import { ApiController } from "../controllers/api.controller";
import UsersRoute from "./users.route";

class ApiRoutes {
        public router: Router;

        private usersRouter : Router;
        private apiController: ApiController;

        constructor() {
            this.router = Router();
            this.apiController = new ApiController();
            this.usersRouter = UsersRoute;

            this.config();
        }

        config(): void {
            this.router.route('/')
                .get(this.apiController.index);

            this.users();
        }

        users() : void {
            this.router.use('/users', this.usersRouter);
        }
}
export default new ApiRoutes().router;
