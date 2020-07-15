const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const meetingShema = new Schema({
    title: {
        type:String,
        required:true
    },
    category:{
        type:String,
    },
    date:{
        type:String,
        required:true
    },
    time:{
        type:String,
        required:true
    },
    people: {
        type:[Object],
    },
    place: {
        type: String,
    },
    description: {
        type: String,
    },
    project: {
        type:String
    }

});

const Meetings = mongoose.model('meetings', meetingShema)

module.exports = Meetings;