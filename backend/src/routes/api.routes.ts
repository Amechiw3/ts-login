import { Router, Request, Response } from 'express';

import { ApiController } from "../controllers/api.controller";

class ApiRoutes {
        public router: Router;
        private apiController: ApiController;

        constructor() {
            this.router = Router();
            this.apiController = new ApiController();

            this.config();
        }

        config(): void {
            this.router.route('/')
                .get(this.apiController.index);
        }
}

export default new ApiRoutes().router;
