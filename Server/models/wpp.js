let mongoose = require('mongoose');
// define the schema for our wpp model
var wppSchema = mongoose.Schema({
    title: {type: String, required: true},
    docNumber: {type: String, required: false, default: 'undefined'},
    sections: [{type: mongoose.Schema.Types.ObjectId, ref: 'SectionSchema'}],
    taskBriefingStatements: [{type: mongoose.Schema.Types.ObjectId, ref: 'TbsSchema'}],
    author: String,//{type: mongoose.Schema.Types.ObjectId, required: true},
    keywords: [String],
    status: String
});

// create the model for users and expose it to our app
module.exports = mongoose.model('WppSchema', wppSchema);