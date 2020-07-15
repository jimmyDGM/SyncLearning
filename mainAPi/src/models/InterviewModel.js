const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InterviewShema = new Schema({
    title: {
        type:String,
        required:true
    },
    category:{
        type:String,
    },
    questions:{
        type:[Object],
    },
    author:{
        type:String,
    },
    medias: {
        type:String,
    },
    responses: {
        type: [Object],
    },
    comments: {
        type: [Object],
    },
    pageUrl: {
        type: String,
    },
    sections: {
        type:[Object],
    },
    project: {
        type: String,
    }

});

const Interview = mongoose.model('interview', InterviewShema)

module.exports = Interview;