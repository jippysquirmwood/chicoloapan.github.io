let router = require('express').Router();
let fs = require('fs');
let path = require('path');

router.get('/', (req,res)=>{
    fs.readFile(path.join(process.cwd(), 'public','daily-message.txt'), 'utf8', (err, data)=>{
        if(err) return res.status(500).send("Error, something broke!");
        res.render(path.join(process.cwd(), 'public', 'views', 'index.html'), {'message': data, user: req.user || 'unauthenticated'});
    });
});

module.exports = router;