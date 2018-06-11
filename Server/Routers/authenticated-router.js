let router  = require('express').Router();

router.get('/', function(req,res){
    res.status(200).send("You're in the authenticated section");
  });

  module.exports = router;