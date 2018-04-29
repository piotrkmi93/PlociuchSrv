import * as express from 'express';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as logger from 'morgan';
import * as helmet from 'helmet';
import * as cors from 'cors';
import {databaseConfig} from "../config/database";

// import bundles
import UserBundle from './bundles/UserBundle/UserBundle';


// server
class Server
{
    private MONGO_URI = databaseConfig;

    public app: express.Application;

    constructor()
    {
        console.log('building server');
        this.app = express();
        this.config();
        this.bundles();
    }

    public config(): void
    {
        // db connection
        mongoose.connect(this.MONGO_URI || process.env.MONGODB_URI);

        // config
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
        this.app.use(logger('dev'));
        this.app.use(compression());
        this.app.use(helmet());
        this.app.use(cors());

        // your magic
        // todo socket config
    }

    // connect your bundles
    private bundles(): void
    {
        UserBundle.init(this.app);
	}
}


// export
export default new Server().app;