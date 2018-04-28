import {CoreRouter} from '../../../../vendor/router/CoreRouter';

export class UserAPIRouter extends CoreRouter
{
    routes()
    {
        this.post('/register', 'UserController@register', 'RegisterValidator');
        // this.post('/register', 'UserController@login', 'LoginValidator');
        // this.post('/register', 'UserController@logout', 'LogoutValidator');
    }
}