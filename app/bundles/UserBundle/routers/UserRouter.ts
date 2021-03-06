import CoreRouter from "../../../../vendor/router/CoreRouter";

export class UserRouter extends CoreRouter
{
    routes()
    {
        this.post('/register', 'UserController@register', 'RegisterValidator');
        this.post('/login', 'UserController@login', 'LoginValidator');
        this.get('/activate/:activationCode', 'UserController@activate');
    }
}