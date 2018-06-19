let router = require('express').Router();
let fs = require('fs');
let path = require('path');

router.get('/', (req,res)=>{
    fs.readFile(path.join(process.cwd(), 'Public','daily-message.txt'), 'utf8', (err, data)=>{
        if(err) return res.status(500).send("Error, something broke!");
        res.render(path.join(process.cwd(), 'Public', 'views', 'index.html'), {'message': data});
    });
});

module.exports = router;