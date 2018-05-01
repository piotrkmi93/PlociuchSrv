import { Request, Response, NextFunction } from "express";
import { connection } from 'mongoose';
import mergeRequestData from "../helpers/mergeRequestData";

export default abstract class CoreValidator
{
    /**
     * This method should returns an array with credentials for each params of sends in request
     */
    protected abstract validator(): any;

    /**
     * Email regex
     *
     * @type {RegExp}
     */
    private emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    /**
     *
     * @param {e.Request} request
     * @param {e.Response} response
     * @param {e.NextFunction} next
     */
    public validate(request: Request, response: Response, next: NextFunction): void
    {
        // array of objects
        let props = this.makePropsArray( this.validator() );

        // object with properties
        // let requestData = this.getAllFromRequest( request );
        let requestData = mergeRequestData( request );

        let errors = [];

        console.log(props);

        this.checkNextProp(errors, props, requestData, () => {

            // todo more code handlers
            if(errors.length){
                response.status(409);
                response.send(errors);
            } else {
                next();
            }
        });

    };

    private checkNextProp(errors, props, requestData, callback, index = 0)
    {
        const prop = props[index];
        if(typeof prop !== 'undefined'){
            const field = requestData[prop.field];
            if(typeof field !== 'undefined'){
                if(prop.type === 'string' || prop.type === 'email')
                {
                    if(typeof field === 'string') {
                        if(prop.type === 'email' && !field.match(this.emailRegex)){
                            errors.push(`${prop.field} is not an email`);
                        }
                        if(typeof prop.min === 'number' && field.length < prop.min){
                            errors.push(`${prop.field} is too short (at leas ${prop.min} characters)`);
                        }
                        if(typeof prop.max === 'number' && field.length > prop.max){
                            errors.push(`${prop.field} is too long (max ${prop.max} characters)`);
                        }
                    } else {
                        errors.push(`${prop.field} is not a string`);
                    }
                }

                if(prop.unique || prop.exists) {
                    this.findInDatabase(prop, prop.field, field, exists => {
                        if(prop.unique && exists){
                            errors.push(`${prop.field} already exists`);
                        }
                        if(prop.exists && !exists){
                            errors.push(`${prop.field} not exists`);
                        }
                        this.checkNextProp(errors, props, requestData, callback, index+1);
                    });
                } else {
                    this.checkNextProp(errors, props, requestData, callback, index+1);
                }
            } else {
                if(prop.required){
                    errors.push(`${prop.field} is required`)
                }
                this.checkNextProp(errors, props, requestData, callback, index+1);
            }
        } else {
            callback();
        }
    }

    private findInDatabase(prop, name, field, callback)
    {
        let query:any = {};
        query[name] = field;
        const collection = prop.unique || prop.exists;
        connection.collection(collection).find(query).toArray((err, results) => {
            callback(results.length);
        });
    }

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
            if(props[name].indexOf('exists:') !== -1) {
                newProp.exists = this.getValue(props[name], 'exists:');
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

}