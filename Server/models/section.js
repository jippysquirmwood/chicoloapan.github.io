let mongoose = require('mongoose');
// define the schema for our wpp model
var sectionSchema = mongoose.Schema({
    title: {type: String, required: true},
    paragraph: {type: String},
    author: {type: mongoose.Schema.Types.ObjectId, required: true}
});

// create the model for users and expose it to our app
module.exports = mongoose.model('SectionSchema', sectionSchema);