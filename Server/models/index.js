fs.readdirSync(__dirname).forEach((file)=>{
    if(file != index.js){
        var moduleName = file.split('.')[0];
        exports[moduleName] = require('./'+moduleName);
    }
})