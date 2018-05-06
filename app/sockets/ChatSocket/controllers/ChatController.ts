import CoreSocketController from "../../../../vendor/controller/CoreSocketController";
import Message from "../../../bundles/ChatBundle/models/Message";

function sendToUser(UserId, connections, data)
{
    const sockets = connections
        .filter(({userId}) => userId === UserId)
        .map(({connection}) => connection);

    for(const s of sockets){
        s.emit('message', data);
        s.emit('message-menu', data);
    }
}

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
        }, (err, success) => {
            if(err) {
                throw err;
            } else {
                console.log('message created');
                const message = {
                    text: data.text,
                    created: (new Date(success.created)).getTime(),
                    conversation: data.conversationId,
                    user: myId
                };

                sendToUser(data.userId, connections, message);
                sendToUser(myId, connections, message);
            }
        });
    }

    public conversation(connection, connections, data)
    {
        Message.find({
            conversation: data.conversationId
        }, (err, messages) => {
            if(err) throw err;
            connection.emit('conversation', messages);
        })
    }
}