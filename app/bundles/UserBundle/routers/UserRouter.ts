import CoreRouter from "../../../../vendor/router/CoreRouter";

export default class UserRouter extends CoreRouter
{
    routes()
    {
        this.post('/register', 'UserController@register', 'RegisterValidator');
        this.post('/login', 'UserController@login', 'LoginValidator');
        // this.post('/logout', 'UserController@logout', 'Auth,LogoutValidator');

        this.get('/activate/:activationCode', 'UserController@activate');
    }
}