import { Request, Response } from 'express';
import CoreController from '../../../../vendor/controller/CoreController';
import User from '../models/User';
import CoreMailer from "../../../../vendor/mailer/CoreMailer";
import generateRandomString from "../../../../vendor/helpers/generateRandomString";

export class UserController extends CoreController
{
    public register(request: Request, response: Response): void
    {
        this.create(
            request.body.login,
            request.body.email,
            request.body.password,
            request,
            response
        );
    }

    public login(request: Request, response: Response): void
    {
        // todo
    }

    public logout(request: Request, response: Response): void
    {
        // todo
    }

    public activate(request: Request, response: Response): void
    {
        const activationCode = request.params.activationCode;

        response.send({
            activationCode: activationCode
        });
    }

    private create(login: string, email: string, password: string, request: Request, response: Response): void
    {
        const activationCode = generateRandomString(30);

        User.create({
            login: login,
            email: email,
            password: password,
            activation_code: activationCode
        }).then(
            user => {
                this.sendActivationMail(user, activationCode, request, response);
            }
        ).catch(failure => {
            response.send({
                reason: failure,
                success: false
            });
        });
    }

    private sendActivationMail(user:any, activationCode: string, request: Request, response: Response)
    {
        const coreMailer = new CoreMailer();
        const link = request.headers.host + '/users/activate/' + activationCode;
        coreMailer.send(
            user.email,
            'New account activation',
            `<p>Activation link for ${user.login} is <a href="${link}">${link}</a>`
        )
            .then(
                success => {
                    response.send({
                        success: true
                    });
                }
            )
            .catch(failure => {

                // todo delete user

                response.send({
                    reason: failure,
                    success: false
                });
            });
    }
}