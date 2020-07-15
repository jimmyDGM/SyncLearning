const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tutorialsShema = new Schema({
    title: {
        type:String,
        required:true
    },
    category:{
        type:String,
    },
    content:{
        type:Object,
    },
    author:{
        type:String,
    },
    id: {
        type:String,
    },
    imageUri: {
        type: String,
    },
    pageUrl: {
        type: String,
    }

});

const Tutorials = mongoose.model('tutorials', tutorialsShema)

module.exports = Tutorials;