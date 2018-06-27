module.exports = function(express,passport, http){
  let router = express.Router();
  router.get('/', function(req,res){
    res.status(200).send("You're in the authenticated section");
  });

  router.get('/profile', function(req,res){
    if(req.isAuthenticated()){
      http.get({
        hostname: 'picasaweb.google.com',
        port: 80,
        path: '/data/entry/api/user/113361814047162052150?alt=json',
        agent: false  // create a new agent just for this one request
      }, (response) => {
        let data = '';
        response.on('data',(chunk)=>data+=chunk);
        response.on('end', ()=>{
          let parsed = JSON.parse(data);
          console.log(parsed)
          let imgSource = parsed.entry['gphoto$thumbnail']['$t'];
          let name = req.user.google.name;
          console.log('name',req.user.google.name, name)
          res.json({user: req.user, name, imgSource, success: true});
        })
      });
    } else {
      res.json({});
    }
    
  });

  router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });



  //google route
  router.get('/google',passport.authenticate('google', { scope : ['profile', 'email'] }));

  router.get('/google/callback',
    passport.authenticate('google', {
      successRedirect : '/',
      failureRedirect : '/'
    })
  );

  function isLoggedIn(req,res,next){
    if(req.isAuthenticated())
      return next();
    res.redirect('/');
  }
  return router;
}
