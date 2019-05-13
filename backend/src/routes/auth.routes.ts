import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { auth } from "../middlewares/auth.middleware";

class AuthRoutes {
    public router : Router;
    private  authController : AuthController;

    constructor() {
        this.router = Router();
        this.authController = new AuthController();

        this.config();
    }

    config() {
        this.router.route("/").get(this.authController.index);
        this.router.route("/signin").post(this.authController.signin);
        this.router.route("/signup").post(this.authController.signup);
        this.router.route("/user").get(auth.required, this.authController.view);
    }
}
export default new AuthRoutes().router;
