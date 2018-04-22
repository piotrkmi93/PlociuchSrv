import { RegisterValidator } from '../validators/RegisterValidator';
import {UserController} from '../controllers/UserController';
import {CoreRouter} from '../../../../vendor/router/CoreRouter';

export default class UserAPIRouter extends CoreRouter
{
    private userController: UserController;

    public constructor()
    {
        super();
        this.userController = new UserController();

        this.routes();
    }

    private routes(): void
    {
        this.router.post('/register', RegisterValidator.validate, this.userController.register);
        // this.router.post('/login', LoginValidator.validate, this.userController.login);
        // this.router.post('/logout', LogoutValidator.validate, this.userController.logout);
    }
}