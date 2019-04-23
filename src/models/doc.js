const  mongoose = require('mongoose');
const { Schema } = mongoose;

const Document = new Schema({
    title: String,
    description: String
});

module.exports = mongoose.model('Document', Document);
