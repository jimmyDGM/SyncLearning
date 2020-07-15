const express = require('express');
const router = express.Router();
const Interview = require('../models/InterviewModel')


router.get('/Interview/project/:id', function(req, res, next){
    Interview.find({project: req.params.id})
    .then(function(interview) {
        res.send(interview)
    })

});

router.post('/Interview', function(req, res, next){
    Interview.create(req.body)
    .then(response => {   
        return res.status(200).json(response)
    })
    .catch( err => {
        console.error(err)
        return res.status(500).json({ errors: err })
    });

});


router.post('/Interview/:id', function(req, res, next){
    Interview.findByIdAndUpdate({_id: req.params.id}, {questions:req.body})


    // Interview.update({_id: req.params.id, "cards.uuid" : req.body.uuid}, {'$set': {
        
    //     'cards.$.description': req.body.description
    // }})
    .then(response => {
        console.log(response)
        return res.status(200).json(response)
    })
    .catch( err => {
        console.error(err)
        return res.status(500).json({ errors: err })
    });

});


router.post('/Interview/sections/:id', function(req, res, next){
    Interview.findByIdAndUpdate({_id: req.params.id}, {sections:req.body})
    .then(response => {   
        console.log(response)
        return res.status(200).json(response)
    })
    .catch( err => {
        console.error(err)
        return res.status(500).json({ errors: err })
    });

});


router.post('/Interview/UserStart/:id', function(req, res, next){
        let newAnswers= req.body

        Interview.findByIdAndUpdate({_id: req.params.id}, { $push: { responses:newAnswers}})
        .then( int => {
            res.send(int)
        })
        .catch( err => {
            console.error(err)
            return res.status(500).json({ errors: err })
        });     


});

router.post('/Interview/UserAnswers/:id', function(req, res, next){

    Interview.update({ _id: req.params.id, "responses.uuid": req.body.uuid }, {'$set': {
        
        'responses.$.answers': req.body.answers
    }})
    .then(response => {   
        return res.status(200).json( response)
    })
    .catch( err => {
        console.error(err)
        return res.status(500).json({ errors: err })
    });

});










router.get('/Interview/:id', function(req, res, next){
    Interview.findById({_id: req.params.id}, req.body)
    .then(function(interview) {
        res.send(interview)
    })

});


module.exports = router;