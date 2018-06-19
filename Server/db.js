class Database{
    constructor(db, uri, options){
        this.db = db;
        this.uri = uri;
        this.options = options;
        this.connect(this.uri, this.options);
    }
    disconnect(){

    }
    connect(uri, options){
        this.db.connect(uri, options)
        .then(connection=>{
            this.onConnected();
            this.db.connection
                .on('open', (args)=>this.onConnectionOpen(args))
                .on('error', (args)=>this.onError(args))
                .on('close', (args)=>this.onConnectionClose(args))
                .on('disconnected', (args)=>this.onDisconnect(args));
        }).catch(err=>{
            console.log('error connecting to db.')
            console.error(err);
        })
    }
    onConnected(args){
        console.log('Connected to db.');
    }
    onConnectionOpen(){
        console.log('Database open.');
    }
    onConnectionClose(){
        console.log('Database closed.');
    }
    onError(error){
        console.log('Database error.', error);
    }
    onDisconnect(){
        console.log('Database disconnected.');
        setTimeout(function(){
            this.connect(this.uri, this.options);
        })
    }
}


module.exports = Database;