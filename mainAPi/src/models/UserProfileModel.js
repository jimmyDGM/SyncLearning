const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs')

const userProfileShema = new Schema({
    name: {
        type:String,
        required:true
    },
    eMail:{
        type:String,
        required: true
    },
    pswd: {
        type:String,
        required:true
    },
    info: {
        type: Object,
    },
    jobTitle:{
        type:String,
    },
    photo:{
        type:String,
    },
    category:{
        type:String,
    },
    description:{
        type:String,
    },
    skillList:{
        type:[String],
    },
    Location: {
        type:String,
    },
    gallery:{
        type:[String],
    },
    friends:{
        type:[String],
    },
    teamMate:{
        type:[String],
    },
    projects:{
       type:[Object],
    },
    experience:{
        type:[Object],
     },
     formations:{
        type:[Object],
     },
     settings: {
         type: Object
     },
     todos:{
         type:[Object]
     }

});
userProfileShema.methods.isCorrectPassword = function(password, callback){
    bcrypt.compare(password, this.pswd, function(err, same) {
      if (err) {
        callback(err);
      } else {
        callback(err, same);
      }
    });
}
const UserProfile = mongoose.model('userProfile', userProfileShema)

module.exports = UserProfile;