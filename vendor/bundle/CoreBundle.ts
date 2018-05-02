import {Application} from "express";

export default class CoreBundle
{
    protected static async route(path: string, router: string, app: Application)
    {
        const importedRouter = await import("../../app/bundles/" + this.name + '/routers/' + router);
        app.use(path, importedRouter[router].getRouter(this.name));
    }
}