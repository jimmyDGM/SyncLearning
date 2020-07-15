const express = require('express');
const router = express.Router();
const Meeting = require('../models/MeetingModel')
const UserProfile = require("../models/UserProfileModel");
const jwt = require('jsonwebtoken');
const secret = 'mysecretsshhh';
const validation = require('../middleware/middleware.js')
const checkToken = validation.checkToken;


router.get('/Meeting', function(req, res, next){
    Meeting.find({})
    .then(function(meeting) {
        res.send(meeting)
    })

});

router.get('/Meeting/personal', checkToken, function(req, res, next){

    jwt.verify(req.token, secret, (err, authorizedData) => {
        if(err){
          console.log(err)
            //If error send Forbidden (403)
            console.log('ERROR: Could not connect to the protected route');
            res.sendStatus(403);
        } else {
            Meeting.find({people: authorizedData.eMail})
            .then(project => {   
                return res.status(200).json( project )

            })
            .catch( err => {
                console.error(err)
                return res.status(500).json({ errors: err })
            });

        }
    }) 

});

router.get('/Meeting/project/:id', checkToken, function(req, res, next){


            Meeting.find({ project: req.params.id })
            .then(project => {   
                return res.status(200).json( project )

            })
            .catch( err => {
                console.error(err)
                return res.status(500).json({ errors: err })
            });

        


});



router.post('/Agenda', checkToken, function(req, res, next){


    jwt.verify(req.token, secret, (err, authorizedData) => {
        if(err){
          console.log(err)
            //If error send Forbidden (403)
            console.log('ERROR: Could not connect to the protected route');
            res.sendStatus(403);
        } else {
            let people = req.body.people ? req.body.people : []
            people.push(authorizedData.eMail)
            req.body.people = people
            Meeting.create(req.body)
            .then(response => {   
                return res.status(200).json({ msg: response })
            })
            .catch( err => {
                console.error(err)
                return res.status(500).json({ errors: err })
            });

        }
    }) 


});

router.post('/Agenda/update/:id', function(req, res, next){
    Meeting.findByIdAndUpdate({_id: req.params.id}, req.body)
    .then(response => {   
        return res.status(200).json(response)
    })
    .catch( err => {
        console.error(err)
        return res.status(500).json({ errors: err })
    });

});

router.post('/Agenda/delete', function(req, res, next){
    Meeting.findByIdAndDelete(req.body)
    .then(response => {   
        return res.status(200).json({ msg: response })
    })
    .catch( err => {
        console.error(err)
        return res.status(500).json({ errors: err })
    });

} )



module.exports = router;