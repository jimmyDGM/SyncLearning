const express = require('express');
const router = express.Router();
const Form = require('../models/FormModel')


router.get('/Form', function(req, res) {
    Form.find({})
    .then(function(form) {
        res.send(form)
    })
    .catch( err => {
        console.error(err)
        return res.status(500).json({ errors: err })
    });
});




router.post('/Form', function(req, res){
    console.log(req.body);
    Form.create({email:req.body.mail, text:req.body.text})
    .then(function(form) {
         res.send(form)

    })
    .catch( err => {
        console.error(err)
        return res.status(500).json({ errors: err })
    });
});




module.exports = router;