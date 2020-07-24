const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FormSchema = new Schema({
    email: {
        type:String,
        required:true
    },
    text: {
        type:String,
    }
});

const Form = mongoose.model('form', FormSchema)

module.exports = Form;