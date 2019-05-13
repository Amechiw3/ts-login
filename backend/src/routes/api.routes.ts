import { Router } from 'express';

import { ApiController } from "../controllers/api.controller";
import UsersRoute from "./users.route";
import AuthRoute from  "./auth.routes";

class ApiRoutes {
        public router: Router;

        private usersRouter : Router;
        private authRouter : Router;
        private apiController: ApiController;

        constructor() {
            this.router = Router();
            this.apiController = new ApiController();
            this.usersRouter = UsersRoute;
            this.authRouter = AuthRoute;

            this.config();
        }

        config(): void {
            this.router.route('/')
                .get(this.apiController.index);

            this.authentication();
            this.users();
        }

        authentication() : void {
            this.router.use("/auth", this.authRouter);
        }

        users() : void {
            this.router.use('/users', this.usersRouter);
        }
}
export default new ApiRoutes().router;
