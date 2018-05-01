import CoreServer from './CoreServer';
import * as SocketIO from 'socket.io'

export default abstract class CoreSocketServer extends CoreServer
{
    public isSocket: boolean = true;

    protected socketServer: SocketIO.Server;

    protected static connections: any[] = [];

    protected abstract sockets(): void;

    public listen(server): void
    {
        this.socketServer = SocketIO.listen(server);

        console.log('Socket Server started');

        this.socketServer.sockets.on('connection', (connection: SocketIO.Socket) => {

            console.log('connected');
            CoreSocketServer.connections.push({ connection });

            // todo insert handlers

            connection.on('disconnect', () => {
                const idx = CoreSocketServer.connections.findIndex(c => c.connection === connection);
                if(idx !== -1){
                    console.log('disconnected');
                    CoreSocketServer.connections.splice(idx, 1);
                }
            });
        });
    }
}