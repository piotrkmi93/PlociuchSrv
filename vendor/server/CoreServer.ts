import * as express from 'express';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as logger from 'morgan';
import * as helmet from 'helmet';
import * as cors from 'cors';
import {databaseConfig} from "../../config/database";

export default abstract class CoreServer
{
    public isSocket = false;

    protected MONGO_URI = databaseConfig;

    protected app: express.Application;

    protected constructor()
    {
        console.log('building server');
        this.app = express();
        this.config();
    }

    protected config(): void
    {
        // db connection
        mongoose.connect(this.MONGO_URI || process.env.MONGODB_URI);

        // config
        this.app.set('view engine', 'pug');
        this.app.use(express.static('public'));

        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
        this.app.use(logger('dev'));
        this.app.use(compression());
        this.app.use(helmet());
        this.app.use(cors());
    }

    public getApp()
    {
        return this.app;
    }
}