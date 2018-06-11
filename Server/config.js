let config = {
    mongo: {
        uri: (user, pw, path)=>{
            return 
        },
        config: 'storage: \r\ndbPath: C:\\AppDev\\IDE\\DATA\\Mongo',
        user: 'methodstatementapp',
        pwd: 'joveruda4',
        options:{
            useMongoClient: true,
            autoIndex: false, // Don't build indexes
            reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
            reconnectInterval: 500, // Reconnect every 500ms
            poolSize: 10, // Maintain up to 10 socket connections
            // If not connected, return errors immediately rather than waiting for reconnect
            bufferMaxEntries: 0
          }
    },
    passport:{
  
    },
    session:{
      secret:"makingtHingsHappen!"
    }
};

module.exports = config;