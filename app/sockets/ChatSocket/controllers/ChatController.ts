import CoreSocketController from "../../../../vendor/controller/CoreSocketController";
import Message from "../../../bundles/ChatBundle/models/Message";

export class ChatController extends CoreSocketController
{
    public send(connection, connections, data)
    {
        const myCon = connections.find(c => c.connection === connection);
        const myId = myCon.userId;
        Message.create({
            user: myId,
            conversation: data.conversationId,
            text: data.text
        }).then(success => {
            connection.emit('send-success');



        }).catch(failure => {
            connection.emit('send-failure');
        });
    }

    public read(connection, connections, data)
    {
        const read = new Date();
        Message.updateMany(
            { _id: { $in: data.messagesIds } },
            { $set: { read: read } }
        ).then(success => {
            connection.emit('read-success');
        }).catch(failure => {
            connection.emit('read-failure');
        })
    }

    private sendToUser(UserId, socket, connections)
    {
        const sockets = connections
            .filter(({userId}) => userId === UserId)
            .map(({connection}) => connection);

        // todo
    }
}