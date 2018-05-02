import CoreSocket from "../../../vendor/socket/CoreSocket";

export default class ChatSocket extends CoreSocket
{
    public static init()
    {
        this.on('contributors', 'ContributorsController@all');
    }
}