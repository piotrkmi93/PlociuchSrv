import * as JWT from 'jsonwebtoken';
import JWTConfig from "../../config/jwt";

const createToken = function(user: any, callback)
{
    const _user:any = {
        id: user.id,
        login: user.login
    };

    JWT.sign({_user}, JWTConfig.secret, (err, token) => {
        if(err) throw err;
        callback(token);
    });

};

export default createToken;