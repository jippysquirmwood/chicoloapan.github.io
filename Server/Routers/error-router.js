const path = require('path');
const router = require('express').Router();

router.get('/unauthenticated', function(req,res){
    console.log('error router');
    res.status(404).render(path.join(process.cwd(),'public','views','error.html'), {page: 'error', user:false, message:{status: 401, message: "We don't recognise you."}});
  });
  router.get('/unauthorised', function(req,res){
      console.log('error router');
      res.status(404).render(path.join(process.cwd(),'public','views','error.html'), {page: 'error', user:false, message:{status: 403, message: "You do not have permission to access this page."}});
    });
router.get('*', function(req,res){
    console.log('error router');
    res.status(404).render(path.join(process.cwd(),'public','views','error.html'), {page: 'error', user:false, message:{status: 404, message: "Page not found."}});
  });

module.exports =  router;

