import CoreSocketServer from "../vendor/server/CoreSocketServer";

// import bundles
import UserBundle from './bundles/UserBundle/UserBundle';


// import sockets
import SearchEngineSocket from "./sockets/SearchEngineSocket/SearchEngineSocket";
import ChatSocket from "./sockets/ChatSocket/ChatSocket";


// server
export default class Server extends CoreSocketServer
{
    constructor()
    {
        super();
        this.bundles();
        this.isSocket && this.sockets();
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
        ChatSocket.init();
    }
}