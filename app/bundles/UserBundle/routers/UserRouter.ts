import CoreRouter from "../../../../vendor/router/CoreRouter";

export class UserRouter extends CoreRouter
{
    routes()
    {
        // api
        this.post('/register', 'UserController@register', 'RegisterValidator');
        this.post('/login', 'UserController@login', 'LoginValidator');

        // normal
        this.get('/activate/:activationCode', 'UserController@activate');
    }
}