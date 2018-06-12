const secrets = require('dotenv').config({path: process.cwd()+'/server/secrets/.env'}); //read out secret stuff not to be shared on github
const express = require('express'); //an express server
const app = express(); //initialize server
const logger = require('morgan'); //server request logging
const mongoose = require('mongoose'); //mongo connector
const ejs = require('ejs'); //templating engine -> allows inserting js into html templates
const bodyParser = require('body-parser');
const path = require('path'); //concatenates paths using the correct encoding on different systems (unix, linux, win etc)
const mongoConfig = require(path.join(process.cwd(),'server','config','mongo.config.js'));
const Database = require(path.join(process.cwd(),'server','db.js'));
let db = new Database(
    mongoose,
    mongoConfig.uri(process.env.DB_USER, process.env.DB_PWD, process.env.DB_HOST,process.env.DB_PORT, process.env.DB_NAME), 
    mongoConfig.options);

app.set('PORT', process.env.PORT || 8080); //http port 8080 usually, if run in some IDes they will put the requred port into process.env.PORT

app.set('view engine', 'ejs'); //register view/templating engine
app.engine('html', ejs.renderFile); //set render function


//add middleware
app.use(logger('dev')); 

//convert parsed JSON strings into req.body
app.use(bodyParser.json({
    limit: '50mb' // so we can send stuff to the server up to this limit.
})); 


//not yet required
//Authentication
// app.use(cookieParser());
// app.use(session({
//     secret: config.session.secret,
//     resave:true,
//     saveUninitialized: true
// }));
// app.use(passport.initialize());
// app.use(passport.session());


//this directts the server to look for static files (js, css, images etc) in the public/static directory
app.use('/',express.static(path.join(process.cwd(), 'public')));


//Register routers to use
//Authenticated Routes ----- havent set up authentication yet, so this will not require authentication at this stage
app.use('/authenticated', /*isLoggedIn,*/ require('./routers/authenticated-router.js'));//(passport, models)); <-- we will pass variables into this route when it is requied

//Public routes
app.use('/', require(path.join(process.cwd(),'server','routers','public-router.js'))); //(passport, db, models));   <-- we will pass variables into this route when it is requied

//any other (*) routes not yet handled will throw an error;
//Note this needs to be replaced with better error handling as this will only handle page request errors and not yet server errors
app.use('/*',require(path.join(process.cwd(),'server','routers','error-router.js'))); //handle any



//start server
app.listen(app.get('PORT'), ()=>{
    console.log('Listening on port ' + app.get('PORT'));
})