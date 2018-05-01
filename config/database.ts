const databaseConfig = (() => {

    // mongo config - required

    const protocol   = 'mongodb';
    const host       = 'localhost';
    const port       = '27017';
    const collection = 'plociuch';

    // mongo config - additional

    const username   = '';
    const password   = '';

    // getting full address

    let address = protocol + '://';
    if(username.length && password.length){
        address += username + ':' + password + '@';
    }
    address += host + ':' + port + '/' + collection;
    return address;

})();

export {databaseConfig};