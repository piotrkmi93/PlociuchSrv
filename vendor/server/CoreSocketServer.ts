import CoreServer from './CoreServer';
import * as SocketIO from 'socket.io'
import verifyToken from "../helpers/verifyToken";
import {type} from "os";

export default abstract class CoreSocketServer extends CoreServer
{
    public isSocket: boolean = true;

    protected socketServer: SocketIO.Server;

    protected static connections: any[] = [];

    private static handlers: any = [];

    protected abstract sockets(): void;

    public listen(server): void
    {
        this.socketServer = SocketIO.listen(server);

        console.log('Socket Server started');

        this.socketServer.sockets.on('connection', (connection: SocketIO.Socket) => {

            console.log('connected');
            CoreSocketServer.connections.push({ connection });

            for(const handler of CoreSocketServer.handlers)
            {
                this.setHandler(handler, connection);
            }

            connection.on('attach-user', token => this.attachUser(connection, token));

            connection.on('disconnect', () => {
                const idx = CoreSocketServer.connections.findIndex(c => c.connection === connection);
                if(idx !== -1){
                    console.log('disconnected');
                    CoreSocketServer.connections.splice(idx, 1);
                }
            });
        });
    }

    private setHandler(handler, connection)
    {
        connection.on(handler.event, data => {
            if(typeof data.token !== 'undefined'){
                verifyToken(data.token, valid => {
                    if(valid){
                        handler.action(connection, CoreSocketServer.connections, data);
                    } else {
                        connection.emit('invalid-token');
                    }
                });
            } else {
                handler.action(connection, CoreSocketServer.connections, data);
            }
        });
    }

    private attachUser(connection, token)
    {
        verifyToken(token, decoded => {
            if(typeof decoded !== 'undefined'){
                const idx = CoreSocketServer.connections.findIndex(c => c.connection === connection);
                if(idx !== -1){
                    console.log('attached');
                    CoreSocketServer.connections[idx].userId = decoded.user._id;
                } else {
                    connection.emit('invalid-token');
                }
            } else {
                connection.emit('invalid-token');
            }
        }, true);
    }

    public static pinHandler(event, action)
    {
        this.handlers.push({
            event, action
        });
    }
}