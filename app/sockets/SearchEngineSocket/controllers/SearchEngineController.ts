import CoreSocketController from "../../../../vendor/controller/CoreSocketController";
import Conversation from "../../../bundles/ChatBundle/models/Conversation";
import User from "../../../bundles/UserBundle/models/User";

export class SearchEngineController extends CoreSocketController
{
    /**
     * Searches contributors by phrase
     *
     * @param connection
     * @param connections
     * @param data
     */
    public search(connection, connections, data)
    {
        const myCon = connections.find(c => c.connection === connection);
        const myId = myCon.userId;
        const cmongo = {
            $or: [
                { one: myId },
                { two: myId }
            ]
        };
        Conversation.find(cmongo, (err, cons: any[]) => {
            let in_cons = [];
            for(const con of cons) {
                if(con.one.toString() === myId) in_cons.push(con.two.toString());
                else in_cons.push(con.one.toString());
            }
            const umongo = {
                login: { $regex: '.*' + data.phrase + '.*' },
                _id: { $nin: [myId] },
                is_active: true
            };
            User.find(umongo, (err, users) => {
                connection.emit('search-result', users.map((user:any) => {
                    return {
                        id: user.id,
                        login: user.login,
                        in_contributors: in_cons.indexOf(user.id) !== -1
                    };
                }));
            });
        });
    }

    /**
     * Creating new conversation
     *
     * @param connection
     * @param connections
     * @param data
     */
    public add(connection, connections, data)
    {
        const myCon = connections.find(c => c.connection === connection);
        const myId = myCon.userId;
        Conversation.create({
            one: myId,
            two: data.userId
        }).then(con => {
            connection.emit('add-contributor-success');
        }).catch(failure => {
            connection.emit('add-contributor-failed');
        })
    }
}