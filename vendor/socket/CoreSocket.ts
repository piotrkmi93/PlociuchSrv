import CoreSocketServer from "../server/CoreSocketServer";
import CoreSocketController from "../controller/CoreSocketController";

export default class CoreSocket
{
    private static controllersCache: any = {};

    protected static async on(event: string, action: string)
    {
        const controllerName = action.slice(0, action.indexOf('@'));
        const actionName = action.replace(controllerName+'@', '');

        let controller: CoreSocketController = undefined;

        if(typeof this.controllersCache[controllerName] !== 'undefined'){
            controller = this.controllersCache[controllerName];
        } else {
            const importedController = await import('../../app/sockets/' + this.name + '/controllers/' + controllerName);
            controller = new importedController[controllerName]();
            this.controllersCache[controllerName] = controller;
        }

        CoreSocketServer.pinHandler(event, controller[actionName]);
    }
}