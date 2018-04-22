import { RegisterValidator } from '../validators/RegisterValidator';
import {UserController} from '../controllers/UserController';
import {CoreRouter} from '../../CoreBundle/router/CoreRouter';

export default class API_UserRouter extends CoreRouter
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
        this.router.post('/register/:frompath', RegisterValidator.validate, this.userController.register);
        // this.router.post('/login', LoginValidator.validate, this.userController.login);
        // this.router.post('/logout', LogoutValidator.validate, this.userController.logout);
    }
}