import { Router } from "express";
import { UsersController } from "../controllers/users.controller";

class UsersRoute {
    public router : Router;
    private usersController : UsersController;

    constructor() {
        this.router = Router();
        this.usersController = new UsersController();

        this.config();
    }

    config() {
        this.router.route('/')
            .get(this.usersController.index)
            .post(this.usersController.add);

        this.router.route("/:ID")
            .get(this.usersController.get)
            .put(this.usersController.update)
            .patch(this.usersController.update)
            .delete(this.usersController.delete);
    }
}
export default new UsersRoute().router;
