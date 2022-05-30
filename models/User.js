const mongoose = require('mongoose');
const Schema = mongoose.Schema; //  = const { Schema } = mongoose;   this is object structuring

const userSchema = new Schema({
    contents: {
        type: String,
    },
    important: Boolean,
    succeess: Boolean,
    date : Date,
    // enrolled : {
    //     type : Date,
    //     default : Date.now
    // } // = timestamps : true,
}, {collection : 'todo'});

module.exports = mongoose.model('User', userSchema);