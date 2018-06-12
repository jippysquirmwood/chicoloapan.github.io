
class Database{
    constructor(db, uri, options){
        this.db = db;     
        this.connect(uri, options);
    }
    disconnect(){

    }
    connect(uri, options){

        console.log('uri',uri)
        this.db.connect(uri, options, 
            function(err){
                if(err) 
                    return this.onError(err);
                console.log('db connection successful');
        });
        
        this.connection = this.db.connection;
        this.connection
            .on('open', (args)=>this.onConnectionOpen(args))
            .on('error', (args)=>this.onError(args))
            .on('close', (args)=>this.onConnectionClose(args))
            .on('disconnected', (args)=>this.onDisconnect(args));
            console.log('ere')
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
            this.connect();
        })
    }
}


module.exports = Database;