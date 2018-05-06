import CoreSocket from "../../../vendor/socket/CoreSocket";

export default class ChatSocket extends CoreSocket
{
    public static init()
    {
        this.on('contributors', 'ContributorsController@all');
        this.on('conversation', 'ChatController@conversation');
        this.on('send', 'ChatController@send');
        this.on('read', 'ChatController@read');
    }
}