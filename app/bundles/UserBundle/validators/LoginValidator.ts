import CoreValidator from "../../../../vendor/validator/CoreValidator";

export class LoginValidator extends CoreValidator
{
    validator()
    {
        return {
            'password': 'required|string|min:6|max:32',
            'login':    'required|string|exists:users|min:3|max:32'
        };
    }
}