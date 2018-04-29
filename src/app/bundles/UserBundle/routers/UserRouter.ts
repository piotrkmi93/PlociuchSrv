import CoreRouter from '../../../../vendor/router/CoreRouter';

export default class UserRouter extends CoreRouter
{
    routes()
    {
        this.post('/register', 'UserController@register', 'RegisterValidator');
        // this.post('/register', 'UserController@login', 'LoginValidator');
        // this.post('/register', 'UserController@logout', 'LogoutValidator');

        this.get('/activate/:activationCode', 'UserController@activate');
    }
}