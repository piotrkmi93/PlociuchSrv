import {Application} from 'express';
import CoreBundle from "../../../vendor/bundle/CoreBundle";

export default class UserBundle extends CoreBundle
{
	public static init(app: Application)
	{
        this.route('/user/', 'UserRouter', app);
	}
}