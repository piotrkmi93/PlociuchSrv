import { Router } from "express";

export class CoreRouter
{
    protected router: Router;

    protected constructor()
    {
        this.router = Router();
    }

    public static getRouter()
    {
        const router = new this();
        return router.router;
    }
}