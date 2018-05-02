import CoreSocketController from "../../../../vendor/controller/CoreSocketController";
import Conversation from "../../../bundles/ChatBundle/models/Conversation";
import User from "../../../bundles/UserBundle/models/User";
import Message from "../../../bundles/ChatBundle/models/Message";

export class ContributorsController extends CoreSocketController
{
    public all(connection, connections, data)
    {
        let contributors = [];
        const myCon = connections.find(c => c.connection === connection);
        const myId = myCon.userId;
        const cmongo = {
            $or: [
                { one: myId },
                { two: myId }
            ]
        };
        Conversation.find(cmongo, (err, conversations: any[]) => {
            for(const conversation of conversations) {
                const idx = contributors.findIndex(({conversationId}) => conversationId === conversation._id);
                if(idx === -1){
                    let contributor = {
                        conversationId: conversation._id.toString(),
                        user: {
                            id: conversation.one.toString() === myId
                                ? conversation.two.toString()
                                : conversation.one.toString()
                        },
                        lastMessage: {
                            text: undefined,
                            date: undefined
                        },
                        unreadMessages: 0
                    };
                    contributors.push(contributor);
                }
            }
            const umongo = {
                _id: { $in: contributors.map(({user}) => user.id) }
            };
            User.find(umongo, (err, users: any[]) => {
                for(const u of users){
                    const idx = contributors.findIndex(({user}) => user.id === u.id);
                    if(idx !== -1){
                        contributors[idx].user.login = u.login;
                    }
                }

                // const mmongo = {
                //     conversation: { $in: contributors.map(({conversationId}) => conversationId) },
                //     user
                // };

                // Message.find()

                // todo messages
                // todo count unread messages
                // todo get last message

                connection.emit('contributors', contributors);

            });
        });
    }
}