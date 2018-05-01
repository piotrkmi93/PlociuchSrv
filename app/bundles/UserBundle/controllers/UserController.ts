import { Request, Response } from 'express';
import CoreController from "../../../../vendor/controller/CoreController";
import generateRandomString from "../../../../vendor/helpers/generateRandomString";
import User from "../models/User";
import CoreMailer from "../../../../vendor/mailer/CoreMailer";
import * as JWT from 'jsonwebtoken';
import {JWTConfig} from "../../../../config/jwt";

export class UserController extends CoreController
{
    /**
     * Register new account
     *
     * @param {e.Request} request
     * @param {e.Response} response
     */
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
        // todo check is activate
        const user = User.findOne({ login: request.body.login }, (err, user:any) => {
            if(err) throw err;
            if(user.is_active){

                const correct = user.compare(request.body.password);
                console.log('correct', correct);

                if (correct) {

                    JWT.sign({user}, JWTConfig.secret, (err, token) => {
                        response.send({token});
                    })

                } else {
                    response.status(409);
                    response.send(['Password is not correct']);
                }

            } else {
                response.status(405);
                response.send(['This account is not activated']);
            }
        });
    }

    public logout(request: Request, response: Response): void
    {
        // todo
    }

    /**
     * Account activation, return success or failure view
     *
     * @param {e.Request} request
     * @param {e.Response} response
     */
    public activate(request: Request, response: Response): void
    {
        const activationCode = request.params.activationCode;
        let msg = '';

        User.findOne({ activation_code: activationCode }, (err, user: any) => {
            if(err) throw err;
            if(!user || !user.activation_code){
                msg = 'User is not exists or already activated';
                response.render('user/activation', {
                    msg: msg
                });
            } else {

                console.log(user);

                user.activation_code = undefined;
                user.is_active = true;
                user.save(err => {
                    if(err) {
                        msg = 'Cannot activate your account!';
                    }
                    else {
                        msg = 'Your account has been successfully activated!';
                    }
                    response.render('user/activation', {
                        msg: msg
                    });
                })
            }
        });
    }

    /**
     * Creates a new user and sends him an email
     *
     * @param {string} login
     * @param {string} email
     * @param {string} password
     * @param {e.Request} request
     * @param {e.Response} response
     */
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

    /**
     * Send activation email to given address
     *
     * @param user
     * @param {string} activationCode
     * @param {e.Request} request
     * @param {e.Response} response
     */
    private sendActivationMail(user:any, activationCode: string, request: Request, response: Response)
    {
        const coreMailer = new CoreMailer();
        const link = request.headers.host + '/user/activate/' + activationCode;
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

                user.remove();

                response.send({
                    reason: failure,
                    success: false
                });
            });
    }
}