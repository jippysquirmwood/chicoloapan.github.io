const secrets = require('dotenv').config({path: process.cwd()+'/server/secrets/.env'}); 

module.exports = {

    // 'facebookAuth' : {
    //     'clientID'      : 'your-secret-clientID-here', // your App ID
    //     'clientSecret'  : 'your-client-secret-here', // your App Secret
    //     'callbackURL'   : 'http://localhost:8080/auth/facebook/callback'
    // },

    // 'twitterAuth' : {
    //     'consumerKey'       : 'your-consumer-key-here',
    //     'consumerSecret'    : 'your-client-secret-here',
    //     'callbackURL'       : 'http://localhost:8080/auth/twitter/callback'
    // },

    'googleAuth' : {
        'clientID'      : process.env.AUTH_GOOGLE_CLIENT_ID,
        'clientSecret'  : process.env.AUTH_GOOGLE_CLIENT_SECRET,
        'callbackURL'   : 'http://localhost:8080/auth/google/callback'
    }

};