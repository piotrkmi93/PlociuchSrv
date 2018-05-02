import CoreSocket from "../../../vendor/socket/CoreSocket";

export default class SearchEngineSocket extends CoreSocket
{
    public static init()
    {
        this.on('search', 'SearchEngineController@search');
        this.on('add-contributor', 'SearchEngineController@add');
    }
}