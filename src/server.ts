import * as express from 'express';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as logger from 'morgan';
import * as helmet from 'helmet';
import * as cors from 'cors';

// import routes
import API_UserRouter from './bundles/UserBundle/routers/api';


// server
class Server
{
    private MONGO_URI = 'mongodb://localhost:27017/plociuch';

    public app: express.Application;

    constructor()
    {
        console.log('building server');
        this.app = express();
        this.config();
        this.routes();
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
    }

    private routes(): void
    {
        this.app.use('/api/users/', API_UserRouter.getRouter());
	}
}


// export
export default new Server().app;