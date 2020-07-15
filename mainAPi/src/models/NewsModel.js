const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newsShema = new Schema({
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

const News = mongoose.model('news', newsShema)

module.exports = News;