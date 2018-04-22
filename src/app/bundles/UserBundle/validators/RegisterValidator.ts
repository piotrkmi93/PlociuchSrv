import { CoreValidator } from '../../../../vendor/validator/CoreValidator';
import { Request, Response, NextFunction } from 'express';

export class RegisterValidator extends CoreValidator
{
    public static validate(request: Request, response: Response, next: NextFunction)
    {
        const validator = new RegisterValidator();
        validator.baseValidate(request, response, next);
    }

    validator()
    {
        return {
            'password': 'required|string|min:6|max:32',
            'login':    'required|string|unique:users|min:3|max:32',
            'email':    'required|email|unique:users|max:255'
        };
    }
}