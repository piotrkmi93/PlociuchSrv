import {Application} from 'express';
import {UserAPIRouter} from './routers/api';

export default class UserBundle
{
    public static init(app: Application)
    {
        app.use('/api/users/', UserAPIRouter.getRouter( this.name ));
    }
}