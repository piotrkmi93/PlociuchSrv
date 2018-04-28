import { Request, Response } from 'express';
import {CoreController} from "../../../../vendor/controller/CoreController";
// import User from '../models/User';

export class UserController extends CoreController
{

    public register(request: Request, response: Response): void
    {
        response.send({
            login: request.body.login,
            email: request.body.email,
            password: request.body.password
        });
    }

}