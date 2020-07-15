const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const boardShema = new Schema({
    name: {
        type:String,
        required:true
    },
    indexTable: {
        type:String,
        required:true
    },
    description: {
        type:String,
    },
    owner: {
        type:String,
    },
    members: {
        type: [Object]
    },
    columns: {
        type: [Object]
    },
    imgUri: {
        type: String,
    },
    cards: {
        type: [Object]
    },
    project: {
        type:String,
        required: true
    }

});

const Board = mongoose.model('Board', boardShema)

module.exports = Board;