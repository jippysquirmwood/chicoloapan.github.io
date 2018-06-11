let db = (function db(dbtype, db, config){
    class DB{
        constructor(config){
            this.db = db;
            this.db.connect(config.uri, config.db.options, function(err){
                if(err) return console.log('Mongoose connection err.\n', err); 
             });
             this.connection =this.db.connection;
             this.db.on('open', function(){
               console.log('Database open.');
               })
               .on('error', function(e){
               console.log('Database error.', e);
               })
               .on('close', function(){
               console.log('Database closed.');
               })
               .on('disconnected', function(){
                  console.log('Database disconnected.');
                  setTimeout(function(){
                      this.db.connect(config.uri, config.options);
                  })
               });
        }
    }

    return {db: new db(config)};
})(dbtype, uri, user, password);