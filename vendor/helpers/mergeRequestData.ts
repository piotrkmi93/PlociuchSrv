import { Request } from "express";

const mergeRequestData = function (request: Request)
{
    let all:any = {};
    for(const prop in request.body){
        all[prop] = request.body[prop];
    }
    for(const prop in request.params){
        all[prop] = request.params[prop];
    }
    for(const prop in request.query){
        all[prop] = request.query[prop];
    }
    return all;
};

export default mergeRequestData;

