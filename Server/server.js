const secrets = require('dotenv').config({path: process.cwd()+'/Server/.env'}); //read out secret stuff not to be shared on github
const express = require('express'); //an express server
const app = express(); //initialize server
const logger = require('morgan'); //server request logging
const mongoose = require('mongoose'); //mongo connector
const ejs = require('ejs'); //templating engine -> allows inserting js into html templates
const bodyParser = require('body-parser');
const path = require('path'); //concatenates paths using the correct encoding on different systems (unix, linux, win etc)
const mongoConfig = require(path.join(process.cwd(),'Server','config','mongo.config.js'));
const Database = require(path.join(process.cwd(),'Server','db.js'));
const http = require('http');
const httpServer = http.Server(app);
const io = require('socket.io')(httpServer);
const passport = require('passport'); 
const cookieParser = require('cookie-parser');
const session = require('express-session');

let db = new Database(
    mongoose,
    mongoConfig.uri(
        process.env.DB_USER, 
        process.env.DB_PWD, 
        process.env.DB_HOST,
        process.env.DB_PORT, 
        process.env.DB_NAME, 
        process.env.DB_AUTH_SOURCE), 
    mongoConfig.options);

require('./passport/google-oauth-strategy.js')(passport);

app.set('PORT', process.env.PORT || 8080); //http port 8080 usually, if run in some IDes they will put the requred port into process.env.PORT

app.set('view engine', 'ejs'); //register view/templating engine
app.engine('html', ejs.renderFile); //set render function


//add middleware
app.use(logger('dev')); 

//convert parsed JSON strings into req.body
app.use(bodyParser.json({
    limit: '50mb' // so we can send stuff to the server up to this limit.
})); 

//Authentication
app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave:true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());


//this directts the server to look for static files (js, css, images etc) in the public/static directory
app.use('/',express.static(path.join(process.cwd(), 'public')));


//Register routers to use
//Authenticated Routes ----- havent set up authentication yet, so this will not require authentication at this stage
app.use('/auth', /*isLoggedIn,*/ require('./routers/authenticated-router.js')(express,passport, http));//(passport, models)); <-- we will pass variables into this route when it is requied

//Public routes
app.use('/', require(path.join(process.cwd(),'server','routers','public-router.js'))); //(passport, db, models));   <-- we will pass variables into this route when it is requied

//any other (*) routes not yet handled will throw an error;
//Note this needs to be replaced with better error handling as this will only handle page request errors and not yet server errors
app.use('/*',require(path.join(process.cwd(),'server','routers','error-router.js'))); //handle any

let count = 0;
//setup websocket
io.on('connection', function (socket) {
    count++
    console.log(count + " users connected.")
    io.emit('news', { msg: 'One more person is online', count: count })
    socket.emit('private', { msg: 'Welcome you are the ' + count + ' person here' })

    socket.on('private', function (data) {
        console.log(data);
    })



    socket.on('disconnect', function() {
        count--
        io.emit('news', { msg: 'Someone went home', count: count })
    })
    socket.on('chat message', (msg)=>{
        console.log('message: ' + msg);
        io.emit('chat message', msg);
    })
});


//start server
httpServer.listen(app.get('PORT'), ()=>{
    console.log('Listening on port ' + app.get('PORT'));
})