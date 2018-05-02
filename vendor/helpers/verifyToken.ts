import * as JWT from 'jsonwebtoken';
import JWTConfig from "../../config/jwt";

const verifyToken = function(token: string, callback, full = false)
{

    JWT.verify(token, JWTConfig.secret, (err, decoded) => {
        if(err) throw err;
        callback(full ? decoded : decoded !== 'undefined');
    });

};

export default verifyToken;