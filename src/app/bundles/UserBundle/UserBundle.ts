import {Application} from 'express';
import UserRouter from './routers/UserRouter';

export default class UserBundle
{
	public static init(app: Application)
	{
		app.use('/user/', UserRouter.getRouter(this.name));
	}
}