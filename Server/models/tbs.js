let mongoose = require('mongoose');
// define the schema for our wpp model
var tbsSchema = mongoose.Schema({
    title: {type: String, required: true},
    docNumber: {type: String, required: false, default: 'undefined'},
    sections: [{type: mongoose.Schema.Types.ObjectId, ref: 'SectionSchema'}],
    author: String,//{type: mongoose.Schema.Types.ObjectId, required: true},
    keywords: [String],
    status: String,
});

// create the model for users and expose it to our app
module.exports = mongoose.model('TbsSchema', tbsSchema);