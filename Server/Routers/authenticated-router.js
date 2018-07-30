
module.exports = function(express,passport, http, mongoose, models){
  let bodyParserJson = require('body-parser').json();
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

  router.post('/wpp', bodyParserJson, (req,res)=>{
    console.log(req.body);
    let wpp = new models.WppSchema({
      title: req.body.title,
      docNumber: req.body.docNumber || 'undefined',
      sections: req.body.sections || [],
      auth: 'test author',
      keywords: req.body.keywords || [],
      status: req.body.status || 'draft'
    });
    wpp.save(err=>{
      if(err) return res.json({success: false, error: err});
      return res.json({success: true, wpp});
    })
  });
  router.get('/wpp/:wpp_id', (req,res)=>{
    models.WppSchema.find({_id: req.params.wpp_id})
      .populate('sections taskBriefingStatements')
      .exec((err,wpps)=>{
        if(err) return res.json({success: false, error: err});
        console.log(wpps);
        res.json({success: true, wpps})
      })
  })
  router.get('/wpp', (req,res)=>{
    models.WppSchema.find({})
      .populate('sections taskBriefingStatements')
      .exec((err,wpps)=>{
        if(err) return res.json({success: false, error: err});
        console.log(wpps);
        res.json({success: true, wpps})
      })
  })
  router.post('/tbs', bodyParserJson, (req,res)=>{
    models.WppSchema.findById(req.body.wpp_id)
      .exec((err,wpp)=>{
        if(err) return res.json({success: false, error: err});
        if(!wpp) return res.json({success: false, error: 'Could not find parent WPP.'});
        let tbs = new models.TbsSchema(req.body.tbs);
        console.log('tbs',tbs)
        tbs.save(err=>{
          if(err) return res.json({success: false, message: 'could not save', tbs, error: err})
                    
            wpp.taskBriefingStatements.push(tbs._id);
            wpp.save(err=>{
                if(err) return res.json({success: false, error: err});
                
                return res.json({success: true, wpp, tbs});
            })

        })
      })
  })
  router.get('/wpp', (req,res)=>{

  })

  function isLoggedIn(req,res,next){
    if(req.isAuthenticated())
      return next();
    res.redirect('/');
  }
  return router;
}
