import { Request, Response, NextFunction } from "express";

export abstract class CoreValidator
{
    /**
     * This method should returns an array with credentials for each params of sends in request
     */
    protected abstract validator();

    /**
     *
     * @param {e.Request} request
     * @param {e.Response} response
     * @param {e.NextFunction} next
     */
    protected baseValidate(request: Request, response: Response, next: NextFunction): void
    {
        // array of objects
        let props = this.makePropsArray( this.validator() );

        // object with properties
        let requestData = this.getAllFromRequest( request );

        for(const prop of props){

        }

        next && next();
    };

    protected makePropsArray(props)
    {
        let newProps = [];
        for(const name in props)
        {
            let newProp:any = {
                field: name
            };

            if(props[name].indexOf('required') !== -1) {
                newProp.required = true;
            }
            if(props[name].indexOf('string') !== -1) {
                newProp.type = 'string';
            }
            if(props[name].indexOf('email') !== -1) {
                newProp.type = 'email';
            }
            if(props[name].indexOf('min:') !== -1) {
                newProp.min = Number( this.getValue(props[name], 'min:') );
            }
            if(props[name].indexOf('max:') !== -1) {
                newProp.max = Number( this.getValue(props[name], 'max:') );
            }
            if(props[name].indexOf('unique:') !== -1) {
                newProp.unique = this.getValue(props[name], 'unique:');
            }

            newProps.push( newProp );

            // todo more
        }
        return newProps;
    }

    private getValue(prop:string, name: string)
    {
        let tmp1 = prop.substring(prop.indexOf(name));
        let tmp2 = tmp1.indexOf('|');
        return tmp1.substring(name.length, tmp2 > -1 ? tmp2 : undefined);
    }


    private getAllFromRequest(request: Request)
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
    }

}