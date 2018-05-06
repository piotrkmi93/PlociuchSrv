import CoreSocketController from "../../../../vendor/controller/CoreSocketController";
import Conversation from "../../../bundles/ChatBundle/models/Conversation";
import User from "../../../bundles/UserBundle/models/User";
import Message from "../../../bundles/ChatBundle/models/Message";

function nextContributor(contributors, myId, resolve, index = 0)
{
    if ( typeof contributors[index] === 'undefined' ) {
        resolve();
    } else {
        findLastMessage(contributors[index], () => {
            nextContributor(contributors, myId, resolve,index + 1);
        });
    }
}

function findLastMessage(contributor, resolve)
{
    Message.find({
        conversation: contributor.conversationId
    }).sort({_id:-1}).limit(1).then(
        (messages:any) => {
            if(messages.length){
                contributor.lastMessage.text = messages[0].text;
                contributor.lastMessage.created = (new Date(messages[0].created)).getTime();
            }
            resolve();
        },
        (err) =>  { throw err; }
    );
}

export class ContributorsController extends CoreSocketController
{
    // todo: 'this' is binding with socket, not class

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
                            created: undefined
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

                nextContributor(contributors, myId, () => {
                    connection.emit('contributors', contributors);
                });

            });
        });
    }
}