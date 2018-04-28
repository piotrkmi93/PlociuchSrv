import {CoreRouter} from '../../../../vendor/router/CoreRouter';

export default class UserAPIRouter extends CoreRouter
{
    routes(): void
    {
        this.post('/register', 'UserController@register', 'RegisterValidator');
        // this.post('/register', 'UserController@login', 'LoginValidator');
        // this.post('/register', 'UserController@logout', 'LogoutValidator');
    }
}