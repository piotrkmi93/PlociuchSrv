import { Request as RQ, Response as RS, NextFunction as NX, Router } from "express";
import {CoreValidator} from "../validator/CoreValidator";
import {CoreController} from "../controller/CoreController";

export class CoreRouter
{
    private controllersCache:any = {};
    private validatorsCache:any = {};

    protected router: Router;
    protected bundle: string;

    protected constructor(bundle)
    {
        this.bundle = bundle;
        this.router = Router();
    }

    protected routes(){}

    public static getRouter(bundle): Router
    {
        const router = new this(bundle);
        router.routes();
        return router.router;
    }

    public get(path: string, actionName: string, validatorName: string = undefined)
    {
        this.createRoute('get', path, actionName, validatorName);
    }

    public post(path: string, actionName: string, validatorName: string = undefined)
    {
        this.createRoute('post', path, actionName, validatorName);
    }

    public put(path: string, actionName: string, validatorName: string = undefined)
    {
        this.createRoute('put', path, actionName, validatorName);
    }

    public delete(path: string, actionName: string, validatorName: string = undefined)
    {
        this.createRoute('delete', path, actionName, validatorName);
    }

    private async createRoute(method: string, path: string, actionName: string, validatorName: string = undefined)
    {
        const controllerName = actionName.slice(0, actionName.indexOf('@'));
        actionName = actionName.replace(controllerName+'@', '');

        let validator:  CoreValidator  = undefined,
            controller: CoreController = undefined;

        if(typeof validatorName !== 'undefined'){
            if(typeof this.validatorsCache[validatorName] !== 'undefined'){
                validator = this.validatorsCache[validatorName];
            } else {
                const importedValidator = await import('../../app/bundles/' + this.bundle + '/validators/' + validatorName);
                validator = new importedValidator[validatorName]();
                this.validatorsCache[validatorName] = validator;
            }
        }

        if(typeof this.controllersCache[controllerName] !== 'undefined'){
            controller = this.controllersCache[controllerName];
        } else {
            const importedController = await import('../../app/bundles/' + this.bundle + '/controllers/' + controllerName);
            controller = new importedController[controllerName]();
            this.controllersCache[controllerName] = controller;
        }

        this.router[method](
            path,
            (rq: RQ, rs: RS, nx: NX) => {
                if(typeof validator !== 'undefined'){
                    validator.validate(rq, rs, nx)
                } else {
                    controller[actionName](rq, rs);
                }
            },
            (rq: RQ, rs: RS) => {
                controller[actionName](rq, rs);
            }
        );
    }

}