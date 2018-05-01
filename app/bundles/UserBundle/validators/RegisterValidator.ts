import CoreValidator from "../../../../vendor/validator/CoreValidator";

export class RegisterValidator extends CoreValidator
{
	validator()
	{
		return {
            'password': 'required|string|min:6|max:32',
            'login':    'required|string|unique:users|min:3|max:32',
            'email':    'required|email|unique:users|max:255'
		};
	}
}