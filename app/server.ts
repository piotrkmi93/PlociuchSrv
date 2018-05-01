// import CoreServer from "../vendor/server/CoreServer";
import CoreSocketServer from "../vendor/server/CoreSocketServer";

// import bundles
import UserBundle from './bundles/UserBundle/UserBundle';


// import sockets
import SearchEngineSocket from "./sockets/SearchEngineSocket/SearchEngineSocket";


// server
export default class Server extends CoreSocketServer
{
    constructor()
    {
        super();
        this.bundles();
    }

    // connect your bundles
    private bundles(): void
    {
        UserBundle.init(this.app);
	}

	// connect your sockets
	protected sockets(): void
    {
        SearchEngineSocket.init();
    }
}