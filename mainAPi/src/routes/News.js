const express = require('express');
const router = express.Router();
const News = require('../models/NewsModel')
const Tutorials = require('../models/TutorialsModel')


router.get('/news', function(req, res, next){
    News.find({})
    .then(function(news) {
        res.send(news)
    })
});

router.post('/admin/news', function(req, res, next){
    News.create(req.body)
    .then(response => {   
        return res.status(200).json({ msg: response })
    })
    .catch( err => {
        console.error(err)
        return res.status(500).json({ errors: err })
    });

});

router.get('/News/:id', function(req, res, next){
    News.findById({_id: req.params.id}, req.body)
    .then(function(project) {
        res.send(project)
    })

});

router.post('/admin/tutorials', function(req, res, next){
    Tutorials.create(req.body)
    .then(response => {   
        return res.status(200).json({ msg: response })
    })
    .catch( err => {
        console.error(err)
        return res.status(500).json({ errors: err })
    });

});

router.get('/tutorials', function(req, res, next){
    Tutorials.find({})
    .then(function(news) {
        res.send(news)
    })

});



module.exports = router;