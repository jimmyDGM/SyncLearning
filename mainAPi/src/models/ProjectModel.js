const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectShema = new Schema({
    name: {
        type:String,
        required:true
    },
    proposal:{
        type:Object,
    },
    category:{
        type:String,
    },
    description:{
        type:String,
    },
    details:{
        type:Object, 
    },
    businessPlan: {
        type:Object
    },
    activitySector:{
        type:Object,
    },
    marketAnalysis: {
        type:Object
    },
    needs:{
        type:[Object],
    },
    conter_part:{
        type:[Object],
    },
    Location: {
        type:String,
    },
    gallery:{
        type:[String],
    },
    owner:{
        type:[String],
        required:true

    },
    investors:{
        type:[Object],
    },
    team:{
        type:[Object],
    },
    rapport:{
        type:[String],
    },
    kanban: {
        type:[Object]
    },
    bmc:{
        type:[Object]
    },
    product:{
        type:Object
    },
    objectifs:{
        type:[Object]
    },
    productDetails:{
        type:[Object]
    },
    marketing: {
        type:[Object]
    },
    finance: {
        type:Object
    },
    simpleFinance: {
        type:Object
    },
    temporaryTeam: {
        type:[Object]
    },


});

const Project = mongoose.model('project', projectShema)

module.exports = Project;